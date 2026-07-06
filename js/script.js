/* ==========================================================================
   LOADER
   ========================================================================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 500);
});

/* ==========================================================================
   AMBIENT PARTICLES (subtle, mouse-reactive)
   ========================================================================== */
(function particles(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let w, h, particlesArr = [];
  const mouse = { x: null, y: null };

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle{
    constructor(){ this.reset(); }
    reset(){
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.r = Math.random() * 1.4 + .3;
      this.baseAlpha = Math.random() * .5 + .15;
      this.vx = (Math.random() - .5) * .12;
      this.vy = (Math.random() - .5) * .12;
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;

      if (mouse.x !== null){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120){
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * .6;
          this.y += (dy / dist) * force * .6;
        }
      }

      if (this.x < 0) this.x = w;
      if (this.x > w) this.x = 0;
      if (this.y < 0) this.y = h;
      if (this.y > h) this.y = 0;
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(205,191,165,${this.baseAlpha})`;
      ctx.fill();
    }
  }

  const count = Math.min(90, Math.floor((w * h) / 14000));
  for (let i = 0; i < count; i++) particlesArr.push(new Particle());

  function animate(){
    ctx.clearRect(0, 0, w, h);
    particlesArr.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ==========================================================================
   NAME DETECTION + CINEMATIC REDIRECT
   ========================================================================== */
(function gate(){
  const form = document.getElementById('gate-form');
  if (!form) return; // página sem formulário (ex: página de "não encontrado")

  const input = document.getElementById('name-input');
  const veil = document.getElementById('transition-veil');
  const gateContent = document.querySelector('.gate-content');

  // Map of keywords to destination pages.
  const routes = [
    { key: 'maria',   page: 'pages/maria.html' },
    { key: 'gabriel', page: 'pages/gabriel.html' },
    { key: 'yasmin',  page: 'pages/yasmin.html' },
    { key: 'ana',     page: 'pages/ana.html' },
  ];

  function detectRoute(rawName){
    const normalized = rawName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // remove acentos para comparação

    for (const route of routes){
      if (normalized.includes(route.key)) return route.page;
    }
    return null;
  }

  function goTo(url){
    gateContent.style.pointerEvents = 'none';
    veil.classList.add('active');
    setTimeout(() => { window.location.href = url; }, 950);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim();

    if (!value){
      gateContent.classList.remove('shake');
      void gateContent.offsetWidth; // reflow para reiniciar animação
      gateContent.classList.add('shake');
      return;
    }

    const destination = detectRoute(value);

    if (destination){
      goTo(destination);
    } else {
      goTo('pages/nao-encontrado.html');
    }
  });
})();
