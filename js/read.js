(function(){
  let active = false;
  let currentUtterance = null;

  function speak(text){
    if(!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    currentUtterance = u;
    window.speechSynthesis.speak(u);
  }

  function onSelection(){
    if(!active) return;
    const sel = window.getSelection().toString().trim();
    if(sel) speak(sel);
  }

  window.toggleReadMode = function(btn){
    active = !active;
    if(active) btn.classList.add('active');
    else btn.classList.remove('active');

    if(!active && window.speechSynthesis) window.speechSynthesis.cancel();
  };

  document.addEventListener('selectionchange', onSelection);
})();
