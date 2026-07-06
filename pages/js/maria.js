/* ==========================================================================
   MARIA — pétalas e estrelas flutuantes
   ========================================================================== */
(function petals(){
  const canvas = document.getElementById('petals');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, items = [];

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Item{
    constructor(){ this.reset(true); }
    reset(initial){
      this.x = Math.random() * w;
      this.y = initial ? Math.random() * h : -20;
      this.isStar = Math.random() > 0.6;
      this.size = this.isStar ? Math.random() * 1.6 + .6 : Math.random() * 5 + 3;
      this.speedY = this.isStar ? 0 : Math.random() * .5 + .25;
      this.speedX = Math.random() * .4 - .2;
      this.drift = Math.random() * Math.PI * 2;
      this.opacity = Math.random() * .5 + .2;
      this.rotation = Math.random() * Math.PI * 2;
    }
    update(){
      if (this.isStar){
        this.opacity = 0.35 + Math.sin(Date.now() / 900 + this.drift) * .25;
        return;
      }
      this.drift += 0.01;
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.drift) * .3;
      this.rotation += 0.004;
      if (this.y > h + 20) this.reset(false);
    }
    draw(){
      if (this.isStar){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236,230,240,${this.opacity})`;
        ctx.fill();
        return;
      }
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size / 1.8, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,142,224,${this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
  }

  const count = Math.min(70, Math.floor((w * h) / 16000));
  for (let i = 0; i < count; i++) items.push(new Item());

  function animate(){
    ctx.clearRect(0, 0, w, h);
    items.forEach(i => { i.update(); i.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();
