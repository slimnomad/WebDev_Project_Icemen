(function(){
  const STEP = 10;

  function read(){
    const v = getComputedStyle(document.documentElement).getPropertyValue('--site-zoom');
    const n = Number(v);
    return n;
  }

  function write(n){
    document.documentElement.style.setProperty('--site-zoom', String(n));
  }

  window.zoomIn = function(){ write(read() + STEP); };
  window.zoomOut = function(){ write(read() - STEP); };
})();
