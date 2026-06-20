'use strict';
const assert = require('assert');
const Feedback = require('./feedback.js');

let passed = 0;
let failed = 0;

function test(label, fn) {
  try {
    fn();
    console.log('  ✓ ' + label);
    passed++;
  } catch (e) {
    console.error('  ✗ ' + label);
    console.error('    ' + e.message);
    failed++;
  }
}

// ── Feedback.validate ────────────────────────────────────────
console.log('\nFeedback.validate');

test('空文字は無効', function () {
  const r = Feedback.validate({ message: '' });
  assert.strictEqual(r.valid, false);
  assert.ok(r.error.length > 0);
});

test('スペースのみは無効', function () {
  const r = Feedback.validate({ message: '   ' });
  assert.strictEqual(r.valid, false);
});

test('null は無効', function () {
  const r = Feedback.validate(null);
  assert.strictEqual(r.valid, false);
});

test('message プロパティなしは無効', function () {
  const r = Feedback.validate({});
  assert.strictEqual(r.valid, false);
});

test('通常のメッセージは有効', function () {
  const r = Feedback.validate({ message: 'フィードバックです' });
  assert.strictEqual(r.valid, true);
  assert.ok(!r.error);
});

test('ちょうど1000文字は有効', function () {
  const r = Feedback.validate({ message: 'あ'.repeat(1000) });
  assert.strictEqual(r.valid, true);
});

test('1001文字は無効', function () {
  const r = Feedback.validate({ message: 'あ'.repeat(1001) });
  assert.strictEqual(r.valid, false);
});

// ── Feedback.buildMailtoLink ──────────────────────────────────
console.log('\nFeedback.buildMailtoLink');

test('mailto: で始まる', function () {
  const link = Feedback.buildMailtoLink({ message: 'テスト' });
  assert.ok(link.startsWith('mailto:'));
});

test('宛先アドレスが含まれる', function () {
  const link = Feedback.buildMailtoLink({ message: 'テスト' });
  assert.ok(link.includes(Feedback.RECIPIENT));
});

test('subject パラメータが含まれる', function () {
  const link = Feedback.buildMailtoLink({ message: 'テスト' });
  assert.ok(link.includes('subject='));
});

test('メッセージ内容が body に含まれる', function () {
  const msg  = 'テストメッセージ123';
  const link = Feedback.buildMailtoLink({ message: msg });
  assert.ok(link.includes(encodeURIComponent(msg)));
});

test('名前あり — 名前が body に含まれる', function () {
  const link = Feedback.buildMailtoLink({ name: '山田太郎', message: 'テスト' });
  assert.ok(link.includes(encodeURIComponent('山田太郎')));
});

test('名前なし — リンクが生成される', function () {
  const link = Feedback.buildMailtoLink({ message: 'テスト' });
  assert.ok(link.startsWith('mailto:'));
});

test('空の名前は無視される', function () {
  const link = Feedback.buildMailtoLink({ name: '  ', message: 'テスト' });
  assert.ok(!link.includes(encodeURIComponent('お名前')));
});

// ── 結果 ─────────────────────────────────────────────────────
console.log('\n結果: ' + passed + ' 件合格, ' + failed + ' 件失敗\n');
if (failed > 0) process.exit(1);
