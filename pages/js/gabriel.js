/* ==========================================================================
   GABRIEL — pequenos efeitos de assinatura
   ========================================================================== */

/* Leve glitch ocasional no título, como uma fita levemente desalinhada */
(function titleGlitch(){
  const title = document.querySelector('.g-title');
  if (!title) return;

  function glitchOnce(){
    title.style.textShadow = `2px 0 var(--accent), -2px 0 rgba(255,255,255,.4)`;
    title.style.transform = 'translateX(1px)';
    setTimeout(() => {
      title.style.textShadow = '0 0 40px rgba(195,255,107,.15)';
      title.style.transform = 'translateX(0)';
    }, 90);
  }

  setInterval(() => {
    if (Math.random() > 0.75) glitchOnce();
  }, 2600);
})();

/* Leve inclinação da fita cassete ao mover o mouse por cima */
(function cassetteTilt(){
  const cassette = document.querySelector('.cassette');
  if (!cassette) return;

  cassette.addEventListener('mousemove', (e) => {
    const rect = cassette.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cassette.style.transform = `perspective(600px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
  });
  cassette.addEventListener('mouseleave', () => {
    cassette.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
  });
})();
