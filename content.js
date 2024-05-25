(function() {
  const DEFAULT_VOLUME = 0.3;

  const setVolume = (elements, volume) => {
    elements.forEach(el => {
      el.volume = volume;
    });
  };

  const initializeVolume = () => {
    const elements = document.querySelectorAll('audio, video');
    setVolume(elements, DEFAULT_VOLUME);
  };

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach(node => {
          if (node.tagName === 'VIDEO' || node.tagName === 'AUDIO') {
            node.volume = DEFAULT_VOLUME;
          } else if (node.querySelectorAll) {
            const mediaElements = node.querySelectorAll('audio, video');
            setVolume(mediaElements, DEFAULT_VOLUME);
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('DOMContentLoaded', initializeVolume);
  window.addEventListener('load', initializeVolume);
  initializeVolume();
})();
