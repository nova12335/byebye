/* ==========================================================================
   ANA — EFEITOS EXTRAS
   1) Corações subindo no canvas de fundo (#hearts)
   2) Tilt 3D no hover das polaroids e cards
   Cole este arquivo em js/ana-effects.js e adicione antes de </body>:
   <script src="js/ana-effects.js"></script>
   ========================================================================== */

/* ---------- 1) CORAÇÕES NO CANVAS ---------- */
(() => {
  const canvas = document.getElementById('hearts');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, hearts = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const rand = (min, max) => Math.random() * (max - min) + min;

  class Heart {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = rand(0, w);
      this.y = initial ? rand(0, h) : h + rand(10, 60);
      this.size = rand(6, 18);
      this.speed = rand(0.3, 1.1);
      this.drift = rand(-0.4, 0.4);
      this.opacity = rand(0.08, 0.35);
      this.hue = rand(260, 300);
      this.wobble = rand(0, Math.PI * 2);
      this.wobbleSpeed = rand(0.01, 0.03);
    }
    update() {
      this.y -= this.speed;
      this.wobble += this.wobbleSpeed;
      this.x += Math.sin(this.wobble) * 0.3 + this.drift * 0.15;
      if (this.y < -30) this.reset(false);
    }
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.size / 18, this.size / 18);
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.bezierCurveTo(-9, -6, -18, 4, 0, 16);
      ctx.bezierCurveTo(18, 4, 9, -6, 0, 4);
      ctx.closePath();
      ctx.fillStyle = `hsla(${this.hue}, 90%, 70%, ${this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
  }

  const count = window.innerWidth < 700 ? 16 : 32;
  for (let i = 0; i < count; i++) hearts.push(new Heart());

  let raf;
  function loop() {
    ctx.clearRect(0, 0, w, h);
    hearts.forEach(hrt => { hrt.update(); hrt.draw(ctx); });
    raf = requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else loop();
  });
})();

/* ---------- 2) TILT 3D NAS FOTOS E CARDS ---------- */
(() => {
  const tiltEls = document.querySelectorAll('.a-polaroid, .a-card');

  tiltEls.forEach(el => {
    el.style.transformStyle = 'preserve-3d';

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = (y * -10).toFixed(2);
      const rotY = (x * 10).toFixed(2);
      el.style.transform =
        `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.03)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();
