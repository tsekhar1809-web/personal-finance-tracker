const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('all inline application scripts parse', () => {
  const scripts = html.split('<script').slice(1)
    .map(script => script.slice(script.indexOf('>') + 1).split('</script>')[0])
    .filter(script => script.trim());

  assert.ok(scripts.length > 0);
  scripts.forEach(script => new vm.Script(script));
});

test('investment ideas use the authenticated server endpoint', () => {
  assert.match(html, /fetch\('\/api\/goal-investments'/);
  assert.match(html, /session\.access_token/);
  assert.doesNotMatch(html, /GEMINI_CONFIG|x-goog-api-key|generativelanguage\.googleapis\.com|AQ\./);
});

test('goal feasibility and risk-filtered investment UI are present', () => {
  assert.match(html, /goalFeasibilityHTML/);
  assert.match(html, /goal-invest-out/);
  assert.match(html, /goal-risk/);
});
