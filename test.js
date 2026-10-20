// Self-check for email-column detection and placeholder filling: node test.js
const vm = require('vm'), fs = require('fs'), assert = require('assert');
const ctx = {}; vm.runInNewContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), ctx);
assert.equal(ctx.findEmailCol_(['Timestamp', 'Email Address', 'Name']), 1);
assert.equal(ctx.findEmailCol_(['Timestamp', 'Your e-mail?', 'Name']), 1);
assert.equal(ctx.findEmailCol_(['Timestamp', 'Name']), -1);
const H = ['Timestamp', 'Email Address', 'What is your name? ', 'Comments'];
const R = ['10/19/2026 9:00:00', 'a@x.com', 'Ana', 'Line 1\nLine <2>'];
assert.equal(ctx.fill_('Thanks {{What is your name?}}!{{Nope}}', H, R), 'Thanks Ana!');
assert.equal(ctx.fill_('{{Comments}}', H, R, true), 'Line 1<br>Line &lt;2&gt;');
console.log('ok');
// reply_ waits for Form Edit Links to fill {{Edit Link}} before sending.
{
  const ctx2 = {}; vm.runInNewContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), ctx2);
  let reads = 0, sent, slept = 0;
  const headers = ['Timestamp', 'Email Address', 'Edit Link'];
  ctx2.PropertiesService = { getDocumentProperties: () => ({ getProperty: () => 'Thanks' }) };
  ctx2.Utilities = { sleep: () => slept++ };
  const msg = { getSubject: () => 'Thanks', getBody: () => 'Change it: {{Edit Link}}', getAttachments: () => [], getInlineImages: () => [] };
  ctx2.GmailApp = { getDrafts: () => [{ getMessage: () => msg }], sendEmail: (to, s, b, o) => { sent = { to, html: o.htmlBody }; } };
  ctx2.inlineImageMap_ = () => ({});
  const sheet = { getLastColumn: () => 3, getRange: (r, c, h, w) => r === 1 && h === 1 && w === 3 && reads === 0 && (reads = -1)
    ? { getDisplayValues: () => [headers] }
    : { getDisplayValues: () => [['t', 'a@b.c', ++reads > 2 ? 'https://edit' : '']], setNote: () => {} } };
  ctx2.reply_(sheet, 2);
  assert.equal(sent.to, 'a@b.c'); assert.equal(sent.html, 'Change it: https://edit'); assert.ok(slept >= 1 && slept < 10);
  console.log('ok edit-link wait');
}
