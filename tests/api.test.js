const assert = require('node:assert/strict');
const test = require('node:test');
const handler = require('../api/goal-investments');

function responseRecorder(){
  return {
    statusCode: 200,
    headers: {},
    body: null,
    status(code){ this.statusCode = code; return this; },
    setHeader(name, value){ this.headers[name] = value; },
    json(body){ this.body = body; return this; }
  };
}

test('rejects requests without a signed-in session', async () => {
  const res = responseRecorder();
  await handler({ method: 'POST', headers: {}, body: { country: 'India' } }, res);
  assert.equal(res.statusCode, 401);
});

test('rejects unsupported methods', async () => {
  const res = responseRecorder();
  await handler({ method: 'GET', headers: {} }, res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.Allow, 'POST');
});

test('rejects invalid risk and oversized goal inputs', async () => {
  const res = responseRecorder();
  await handler({
    method: 'POST',
    headers: { authorization: 'Bearer session-token' },
    body: { country: 'India', currency: 'INR', target: 1000, months: 12, existingSavings: 0, requiredMonthly: 1, avgMonthlySurplus: 1, feasibility: 'Possible', risk: 'unknown' }
  }, res);
  assert.equal(res.statusCode, 400);
});

test('reports missing server credentials without calling providers', async () => {
  const names = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'GEMINI_API_KEY'];
  const previous = Object.fromEntries(names.map(name => [name, process.env[name]]));
  names.forEach(name => delete process.env[name]);
  try {
    const res = responseRecorder();
    await handler({
      method: 'POST',
      headers: { authorization: 'Bearer session-token' },
      body: { country: 'India', currency: 'INR', target: 1000, months: 12, existingSavings: 0, requiredMonthly: 1, avgMonthlySurplus: 1, feasibility: 'Possible', risk: 'all' }
    }, res);
    assert.equal(res.statusCode, 503);
    assert.doesNotMatch(JSON.stringify(res.body), /api key|secret/i);
  } finally {
    names.forEach(name => {
      if(previous[name] === undefined) delete process.env[name];
      else process.env[name] = previous[name];
    });
  }
});
