(function () {
  'use strict';

  var Feedback = {};

  Feedback.RECIPIENT = 'hiro.0822gogo@gmail.com';
  Feedback.MAX_MESSAGE_LENGTH = 1000;

  Feedback.validate = function (data) {
    if (!data || typeof data.message !== 'string' || data.message.trim() === '') {
      return { valid: false, error: 'メッセージを入力してください' };
    }
    if (data.message.trim().length > Feedback.MAX_MESSAGE_LENGTH) {
      return { valid: false, error: 'メッセージは' + Feedback.MAX_MESSAGE_LENGTH + '文字以内で入力してください' };
    }
    return { valid: true };
  };

  Feedback.buildMailtoLink = function (data) {
    var subject = encodeURIComponent('CASA SORAへのフィードバック');
    var lines = [];
    if (data.name && data.name.trim()) {
      lines.push('お名前：' + data.name.trim(), '');
    }
    lines.push('メッセージ：', data.message.trim());
    var body = encodeURIComponent(lines.join('\n'));
    return 'mailto:' + Feedback.RECIPIENT + '?subject=' + subject + '&body=' + body;
  };

  Feedback.init = function () {
    var btn     = document.getElementById('feedback-btn');
    var modal   = document.getElementById('feedback-modal');
    var overlay = document.getElementById('feedback-overlay');
    var closeBtn  = document.getElementById('feedback-close');
    var cancelBtn = document.getElementById('feedback-cancel');
    var submitBtn = document.getElementById('feedback-submit');
    var nameEl    = document.getElementById('feedback-name');
    var msgEl     = document.getElementById('feedback-message');
    var errorEl   = document.getElementById('feedback-error');

    function open() {
      modal.removeAttribute('hidden');
      overlay.removeAttribute('hidden');
      msgEl.focus();
    }

    function close() {
      modal.setAttribute('hidden', '');
      overlay.setAttribute('hidden', '');
      nameEl.value = '';
      msgEl.value  = '';
      errorEl.textContent = '';
    }

    btn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hasAttribute('hidden')) close();
    });

    submitBtn.addEventListener('click', function () {
      var data   = { name: nameEl.value, message: msgEl.value };
      var result = Feedback.validate(data);
      if (!result.valid) {
        errorEl.textContent = result.error;
        msgEl.focus();
        return;
      }
      errorEl.textContent = '';
      window.location.href = Feedback.buildMailtoLink(data);
      close();
    });
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Feedback;
  } else {
    window.Feedback = Feedback;
  }
})();
