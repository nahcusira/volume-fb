document.getElementById('volume-slider').addEventListener('input', function() {
  const volume = this.value;
  document.getElementById('volume-value').textContent = volume;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: setPageVolume,
      args: [volume / 100]
    });
  });
});

function setPageVolume(volume) {
  const elements = document.querySelectorAll('audio, video');
  elements.forEach(el => {
    el.volume = volume;
  });
}
