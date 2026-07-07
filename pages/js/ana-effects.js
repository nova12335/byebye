/* ==========================================================================
   ANA — corações flutuantes suaves
   ========================================================================== */
(function floatingHearts(){
  const canvas = document.getElementById('hearts');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, hearts = [];

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function drawHeart(x, y, size, opacity){
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 20, size / 20);
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.bezierCurveTo(0, -2, -10, -6, -10, 2);
    ctx.bezierCurveTo(-10, 8, -4, 12, 0, 16);
    ctx.bezierCurveTo(4, 12, 10, 8, 10, 2);
    ctx.bezierCurveTo(10, -6, 0, -2, 0, 4);
    ctx.closePath();
    ctx.fillStyle = `rgba(217,137,154,${opacity})`;
    ctx.fill();
    ctx.restore();
  }

  class Heart{
    constructor(){ this.reset(true); }
    reset(initial){
      this.x = Math.random() * w;
      this.y = initial ? Math.random() * h : h + 20;
      this.size = Math.random() * 10 + 8;
      this.speed = Math.random() * .4 + .15;
      this.drift = Math.random() * Math.PI * 2;
      this.opacity = Math.random() * .3 + .12;
    }
    update(){
      this.y -= this.speed;
      this.drift += 0.01;
      this.x += Math.sin(this.drift) * .3;
      if (this.y < -20) this.reset(false);
    }
    draw(){ drawHeart(this.x, this.y, this.size, this.opacity); }
  }

  const count = Math.min(28, Math.floor((w * h) / 45000));
  for (let i = 0; i < count; i++) hearts.push(new Heart());

  function animate(){
    ctx.clearRect(0, 0, w, h);
    hearts.forEach(hrt => { hrt.update(); hrt.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();
