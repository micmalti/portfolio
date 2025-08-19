document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("wordCanvas");
  const ctx = canvas.getContext("2d", { alpha: false });
  let animationId;
  let words = [];
  const wordList = ["#linear algebra", "#calculus", "#probability", "#statistics", "#stochastic processes", "#machine learning", "#cryptography", "#artificial intelligence", "#llm", "#python", "#c++", "#javascript", "#competitive programming", "#algorithms", "#data structures", "#system design", "#software architecture", "#databases", "#devops", "#ci/cd", "#web development", "#frontend development", "#backend bevelopment", "#ui/ux", "#blockchain", "#bitcoin", "#data science", "#data analysis", "#data visualisation", "#geospatial data", "#technical writing", "#documentation", "#communication", "#productivity", "#memory techniques", "#mental math", "#linux", "#shell scripting", "#git", "#troubleshooting", "#raspberry pi", "#open source", "#free software", "#writing", "#molecular dynamics", "#lammps", "#parallel computing", "#jupyter", "#web crawling", "#automation", "#android", "#node", "#security", "#note taking", "#typography", "#product management", "#etl pipelines"];
  const rows = 30;
  const wordsToShow = 100;
  const opacities = [0.8, 0.7, 0.6, 0.5];
  const fontSizes = ["0.75rem", "0.875rem", "1rem", "1.125rem", "1.25rem"];
  const speeds = [0.3, 0.5, 0.7, 1.0];

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initWords();
  }

  function initWords() {
    words = [];
    const rowHeight = canvas.height / rows;

    for (let i = 0; i < wordsToShow; i++) {
      const row = Math.floor(Math.random() * rows);
      const word = wordList[Math.floor(Math.random() * wordList.length)];
      const fontSize = fontSizes[Math.floor(Math.random() * fontSizes.length)];
      const opacity = opacities[Math.floor(Math.random() * opacities.length)];
      const speed = speeds[Math.floor(Math.random() * speeds.length)];
      const direction = Math.random() > 0.5 ? 1 : -1;
      const x = Math.random() * canvas.width;
      const y = (row + 0.5) * rowHeight > canvas.height - 70 ? canvas.height - 70 : (row + 0.5) * rowHeight;

      words.push({
        word,
        row,
        x,
        y,
        fontSize,
        opacity,
        speed: speed * direction,
        width: 0
      });
    }

    if (!animationId) {
      animate();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(17, 17, 17)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    words.forEach((wordObj) => {
      wordObj.x += wordObj.speed;
      if (wordObj.speed > 0 && wordObj.x > canvas.width + 100) {
        wordObj.x = -wordObj.width;
      } else if (wordObj.speed < 0 && wordObj.x < -wordObj.width - 100) {
        wordObj.x = canvas.width + wordObj.width;
      }

      ctx.font = wordObj.fontSize + " serif";
      ctx.globalAlpha = wordObj.opacity;
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillText(wordObj.word, wordObj.x, wordObj.y);

      // Store width for wrapping calculations
      wordObj.width = ctx.measureText(wordObj.word).width;
    });

    ctx.globalAlpha = 1.0;
    animationId = requestAnimationFrame(animate);
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
      animationId = null;
    } else if (!animationId) {
      animate();
    }
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(animationId);
  });
});
