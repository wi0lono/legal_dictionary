document.addEventListener('keydown', function (e) {
    if (e.key === 'Shift') {
      let selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        chrome.runtime.sendMessage({ word: selectedText });
      }
    }
  });
  