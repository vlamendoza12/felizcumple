window.addEventListener('load', () => {
  const confetti = document.getElementById('confetti');
  const musica = document.getElementById('musica');
  const ctx = confetti.getContext('2d');
  confetti.width = window.innerWidth;
  confetti.height = window.innerHeight;

  // Lanzar confeti
  const piezas = Array.from({ length: 150 }, () => crearConfeti());

  function crearConfeti() {
    return {
      x: Math.random() * confetti.width,
      y: Math.random() * confetti.height - confetti.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 100,
      color: `hsl(${Math.random() * 360},100%,50%)`
    };
  }

  function dibujar() {
    ctx.clearRect(0, 0, confetti.width, confetti.height);
    piezas.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.r, p.r);
    });
    actualizar();
    requestAnimationFrame(dibujar);
  }

  function actualizar() {
    piezas.forEach(p => {
      p.y += Math.cos(p.d) + 1 + p.r / 2;
      p.x += Math.sin(p.d);
      if (p.y > confetti.height) p.y = 0 - p.r;
    });
  }

  dibujar();

  // Intentar reproducir música al cargar
  musica.volume = 0.5;
  const playMusic = () => {
    musica.play().catch(() => {});
    document.body.removeEventListener('click', playMusic);
  };
  document.body.addEventListener('click', playMusic);
});
