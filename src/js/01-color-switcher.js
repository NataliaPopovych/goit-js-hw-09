function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
  const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
  };
  const { start, stop } = refs;
  
  let startInterval = null;
  
  startColorSwitcher();
  
  function startSwitch() {	
      start.removeEventListener('click', startSwitch);
      startInterval = setInterval(() => {
          document.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
      stop.addEventListener('click', stopSwitch);
  }
  
  function stopSwitch() {
      stop.removeEventListener('click', stopSwitch);
      clearInterval(startInterval);
      startColorSwitcher();
  }
  
  function startColorSwitcher() {
      start.addEventListener('click', startSwitch);
  }