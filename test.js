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
