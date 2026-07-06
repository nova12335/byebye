/* ==========================================================================
   COMMON.JS
   Funcionalidades compartilhadas entre todas as páginas de memórias.
   Cada página (maria, gabriel, yasmin, ana) inclui este arquivo e adiciona
   seu próprio script para o que for específico do tema.
   ========================================================================== */

/* -------------------------------------------------------
   ENTRADA CINEMATOGRÁFICA
   A "veil" (véu preto) começa visível e se dissolve suavemente
   assim que a página carrega, criando a sensação de transição
   contínua vinda da página anterior.
------------------------------------------------------- */
(function cinematicEntrance(){
  const veil = document.getElementById('transition-veil');
  if (!veil) return;
  // O véu começa opaco (definido em CSS) e se dissolve pouco depois
  // do carregamento, dando a sensação de transição contínua vinda
  // da página anterior.
  requestAnimationFrame(() => {
    setTimeout(() => veil.classList.add('veil-hidden'), 120);
  });
})();

/* -------------------------------------------------------
   BARRA DE PROGRESSO DE LEITURA
------------------------------------------------------- */
(function progressBar(){
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = pct + '%';
  });
})();

/* -------------------------------------------------------
   REVELAÇÃO NO SCROLL
   Qualquer elemento com [data-reveal] aparece suavemente
   quando entra na viewport.
------------------------------------------------------- */
(function scrollReveal(){
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  items.forEach(item => observer.observe(item));
})();

/* -------------------------------------------------------
   PARALLAX SUAVE COM O MOUSE
   Elementos com [data-parallax="0.4"] se movem proporcionalmente
   ao movimento do mouse (o valor define a intensidade).
------------------------------------------------------- */
(function mouseParallax(){
  const items = document.querySelectorAll('[data-parallax]');
  if (!items.length) return;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    items.forEach(item => {
      const strength = parseFloat(item.dataset.parallax) || 0.3;
      item.style.transform = `translate(${dx * strength * 20}px, ${dy * strength * 20}px)`;
    });
  });
})();

/* -------------------------------------------------------
   LIGHTBOX DE GALERIA
   Qualquer <img data-lightbox> abre em tela cheia ao clicar.
------------------------------------------------------- */
(function lightbox(){
  const images = document.querySelectorAll('[data-lightbox]');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Fechar">&times;</button>
    <img class="lightbox-img" src="" alt="">
  `;
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  images.forEach(img => {
    img.addEventListener('click', () => {
      imgEl.src = img.src;
      imgEl.alt = img.alt || '';
      overlay.classList.add('active');
    });
  });

  function close(){ overlay.classList.remove('active'); }
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

/* -------------------------------------------------------
   PLAYER DE MÚSICA
   Estrutura HTML esperada:
   <div class="music-player" data-track="../assets/music/musica.mp3">
     <button class="mp-toggle">...</button>
     <div class="mp-progress"><div class="mp-progress-fill"></div></div>
   </div>
------------------------------------------------------- */
(function musicPlayer(){
  const players = document.querySelectorAll('.music-player');
  if (!players.length) return;

  players.forEach(player => {
    const src = player.dataset.track;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.55;

    const toggleBtn = player.querySelector('.mp-toggle');
    const fill = player.querySelector('.mp-progress-fill');
    const progressTrack = player.querySelector('.mp-progress');
    let isPlaying = false;

    function setState(playing){
      isPlaying = playing;
      player.classList.toggle('playing', playing);
    }

    toggleBtn.addEventListener('click', () => {
      if (isPlaying){
        audio.pause();
        setState(false);
      } else {
        audio.play().catch(() => {
          // Reprodução automática bloqueada pelo navegador — usuário precisa interagir.
          console.info('Toque no botão novamente para iniciar a música.');
        });
        setState(true);
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (!fill || !audio.duration) return;
      const pct = (audio.currentTime / audio.duration) * 100;
      fill.style.width = pct + '%';
    });

    if (progressTrack){
      progressTrack.addEventListener('click', (e) => {
        const rect = progressTrack.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        if (audio.duration) audio.currentTime = ratio * audio.duration;
      });
    }

    audio.addEventListener('error', () => {
      player.classList.add('no-audio');
      const label = player.querySelector('.mp-title');
      if (label) label.textContent = 'Adicione "musica.mp3" em assets/music';
    });
  });
})();

/* -------------------------------------------------------
   SCROLL SUAVE PARA ÂNCORAS
------------------------------------------------------- */
(function smoothAnchors(){
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* -------------------------------------------------------
   TRATAMENTO DE IMAGENS AUSENTES
   Enquanto as fotos reais não são adicionadas, mostramos
   um placeholder elegante em vez de um ícone de imagem quebrada.
------------------------------------------------------- */
(function placeholderImages(){
  document.querySelectorAll('img[data-placeholder-label]').forEach(img => {
    img.addEventListener('error', () => {
      const label = img.dataset.placeholderLabel || 'foto';
      const wrap = document.createElement('div');
      wrap.className = 'img-placeholder';
      wrap.style.aspectRatio = img.dataset.ratio || '4 / 5';
      wrap.innerHTML = `<span>${label}</span>`;
      img.replaceWith(wrap);
    }, { once: true });
  });
})();
