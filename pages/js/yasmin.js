/* ==========================================================================
   YASMIN — poeira suave flutuando, como luz entrando pela biblioteca
   ========================================================================== */
(function dustMotes(){
  // Cria um canvas leve apenas para a seção do herói, mantendo a página
  // com o peso visual de papel — sem exagerar em efeitos.
  const hero = document.querySelector('.y-hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '.5';
  hero.style.position = 'relative';
  hero.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let w, h;
  function resize(){
    w = canvas.width = hero.offsetWidth;
    h = canvas.height = hero.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const motes = Array.from({ length: 40 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2 + .3,
    speed: Math.random() * .18 + .05,
    drift: Math.random() * Math.PI * 2,
    opacity: Math.random() * .4 + .1
  }));

  function animate(){
    ctx.clearRect(0, 0, w, h);
    motes.forEach(m => {
      m.y -= m.speed;
      m.drift += 0.005;
      m.x += Math.sin(m.drift) * .15;
      if (m.y < -5) { m.y = h + 5; m.x = Math.random() * w; }

      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(122,106,78,${m.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
})();
