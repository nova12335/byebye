/* ==========================================================================
   ANA — EFEITOS EXTRAS (versão corrigida)
   Só o tilt 3D no hover — os corações já são feitos pelo pages/js/ana.js,
   então NÃO duplicamos a animação do canvas aqui (evita flicker).
   Salve em: pages/js/ana-effects.js
   ========================================================================== */
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
