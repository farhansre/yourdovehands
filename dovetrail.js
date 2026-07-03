/* Your Dove Hands — tiny doves that trail the cursor and drift away. */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SRC = 'dove.png';
  var last = 0, minGap = 850;   // long gap between possible spawns
  var chance = 0.3;             // ...and even then, only sometimes — a rare dove, not a constant trail

  function spawn(x, y) {
    var d = document.createElement('img');
    d.src = SRC;
    d.setAttribute('aria-hidden', 'true');
    var size = 13 + Math.random() * 12;
    d.style.cssText =
      'position:fixed;left:' + (x - size / 2) + 'px;top:' + (y - size / 2) + 'px;' +
      'width:' + size + 'px;height:auto;pointer-events:none;z-index:9999;opacity:0.85;' +
      'will-change:transform,opacity;' +
      'transform:rotate(' + (Math.random() * 40 - 20) + 'deg);' +
      'transition:transform 1.1s ease-out, opacity 1.1s ease-out;';
    document.body.appendChild(d);
    requestAnimationFrame(function () {
      d.style.transform =
        'translate(' + (Math.random() * 30 - 15) + 'px,' + (-24 - Math.random() * 26) + 'px) ' +
        'rotate(' + (Math.random() * 50 - 25) + 'deg) scale(0.5)';
      d.style.opacity = '0';
    });
    setTimeout(function () { d.remove(); }, 1200);
  }

  window.addEventListener('pointermove', function (e) {
    var now = Date.now();
    if (now - last < minGap) return;
    if (Math.random() > chance) return;
    last = now;
    if (e.clientX != null) spawn(e.clientX, e.clientY);
  }, { passive: true });
})();
