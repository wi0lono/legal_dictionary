chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    fetch(chrome.runtime.getURL("dictionary.json"))
      .then(response => response.json())
      .then(data => {
        let definition = data[message.word.toLowerCase()];
        if (definition) {
          chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            func: showDefinitionPopup,
            args: [message.word, definition]
          });
        }
      });
  });
  
  function showDefinitionPopup(word, definition) {
    let popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.padding = '10px';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.innerHTML = `<strong>${word}:</strong> ${definition}`;
    document.body.appendChild(popup);
  
    // Remove the popup after a few seconds
    setTimeout(() => {
      popup.remove();
    }, 5000);
  }
  