const FALLBACK_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3-flash-preview',
  'gemini-flash-lite-latest'
];
const ALLOWED_RISKS = new Set(['low', 'medium', 'high']);

function send(res, status, body){
  return res.status(status).json(body);
}

function buildPrompt(input){
  const tiers = input.risk === 'all' ? ['low', 'medium', 'high'] : [input.risk];
  const system = [
    'You provide factual public investment information, not personal financial advice.',
    `Only list instruments available to retail residents of ${input.country}, in ${input.currency}.`,
    'Use public sources and Google Search grounding. Never invent products, rates, returns, dates, eligibility, or sources.',
    'If current information cannot be verified, use null for unknown numeric values and explain that information is unavailable.',
    'Respect the stated investment horizon and disclose longer recommended holding periods or lock-ins.',
    'Do not provide allocations, guarantees, or promises of return. State risks clearly.',
    'Return no more than three currently available, specifically named options per requested risk tier, best first by recent publicly published performance.',
    'Return only a JSON object matching the supplied schema, with no markdown or additional commentary.'
  ].join('\n');
  const tierSchema = tiers.map(tier => `"${tier}":{"emptyReason":string|null,"instruments":[{"name":string,"type":string,"returnMinPct":number|null,"returnMaxPct":number|null,"performancePeriod":string|null,"returnBasis":string,"lockInMonths":number|null,"whyItFits":string,"riskNote":string}]}`).join(',');
  const user = [
    `Country: ${input.country}`,
    `Currency: ${input.currency}`,
    `Goal amount: ${input.target}`,
    `Time horizon: ${input.months} months`,
    `Existing savings: ${input.existingSavings}`,
    `Required monthly saving: ${input.requiredMonthly}`,
    `Current average monthly surplus: ${input.avgMonthlySurplus}`,
    `Calculated feasibility: ${input.feasibility}`,
    `Requested risk tiers: ${tiers.join(', ')}`,
    `Return JSON only: {"asOf":"date|null","tiers":{${tierSchema}}}`
  ].join('\n');
  return { system, user };
}

async function callGemini(model, prompt, grounded, apiKey){
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 50000);
  try {
    const requestBody = {
      systemInstruction: { parts: [{ text: prompt.system }] },
      contents: [{ role: 'user', parts: [{ text: prompt.user }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 4096 }
    };
    if(grounded) requestBody.tools = [{ google_search: {} }];
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    if(!response.ok){
      const error = new Error(data.error?.message || 'Investment provider error.');
      error.status = response.status;
      throw error;
    }
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

async function generate(prompt, apiKey){
  const preferred = process.env.GEMINI_MODEL || FALLBACK_MODELS[0];
  const models = [preferred, ...FALLBACK_MODELS.filter(model => model !== preferred)];
  let lastError;
  for(const model of models){
    try {
      return { data: await callGemini(model, prompt, true, apiKey), grounded: true, model };
    } catch(error){
      lastError = error;
      if(error.name === 'AbortError') throw error;
      if([400, 403, 429].includes(error.status)){
        try {
          return { data: await callGemini(model, prompt, false, apiKey), grounded: false, model };
        } catch(fallbackError){
          lastError = fallbackError;
        }
      }
      if(![400, 404, 429].includes(lastError.status)) throw lastError;
    }
  }
  throw lastError || new Error('No supported investment model is available.');
}

function validInput(body){
  if(!body || typeof body !== 'object') return false;
  if(typeof body.country !== 'string' || body.country.trim().length < 2 || body.country.length > 100) return false;
  if(typeof body.currency !== 'string' || body.currency.length < 3 || body.currency.length > 8) return false;
  if(!Number.isFinite(body.target) || body.target <= 0 || body.target > 1e15) return false;
  if(!Number.isInteger(body.months) || body.months < 1 || body.months > 360) return false;
  if(!Number.isFinite(body.existingSavings) || body.existingSavings < 0 || body.existingSavings > 1e15) return false;
  if(!Number.isFinite(body.requiredMonthly) || !Number.isFinite(body.avgMonthlySurplus)) return false;
  if(typeof body.feasibility !== 'string' || body.feasibility.length > 100) return false;
  return body.risk === 'all' || ALLOWED_RISKS.has(body.risk);
}

async function handler(req, res){
  res.setHeader('Cache-Control', 'no-store');
  if(req.method !== 'POST'){
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  const tokenMatch = (req.headers.authorization || '').match(/^Bearer\s+(.+)$/i);
  if(!tokenMatch) return send(res, 401, { error: 'Please sign in again to get investment ideas.' });

  const body = req.body && typeof req.body === 'string' ? (() => { try { return JSON.parse(req.body); } catch { return null; } })() : req.body;
  if(!validInput(body)) return send(res, 400, { error: 'The investment request is invalid.' });

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if(!supabaseUrl || !supabaseAnonKey || !geminiApiKey){
    return send(res, 503, { error: 'Investment ideas are not configured yet.' });
  }

  try {
    const authResponse = await fetch(new URL('/auth/v1/user', supabaseUrl), {
      headers: { apikey: supabaseAnonKey, Authorization: `Bearer ${tokenMatch[1]}` }
    });
    if(!authResponse.ok) return send(res, 401, { error: 'Please sign in again to get investment ideas.' });

    const prompt = buildPrompt(body);
    return send(res, 200, await generate(prompt, geminiApiKey));
  } catch(error){
    if(error.name === 'AbortError') return send(res, 504, { error: 'The investment request timed out. Please try again.' });
    if(error.status === 429) return send(res, 429, { error: 'Investment ideas are temporarily rate-limited. Please try again shortly.' });
    console.error('Goal investment request failed:', error.status || error.name || 'unknown error');
    return send(res, 502, { error: 'Investment ideas are temporarily unavailable.' });
  }
}

module.exports = handler;
module.exports.config = { maxDuration: 60, api: { bodyParser: { sizeLimit: '8kb' } } };
module.exports.validInput = validInput;
module.exports.buildPrompt = buildPrompt;
