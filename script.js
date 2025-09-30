(function () {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  // Setup canvas size
  function resizeCanvas() {
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Simple confetti
  const colors = [
    "#f472b6",
    "#fb7185",
    "#60a5fa",
    "#34d399",
    "#fbbf24",
    "#c084fc",
  ];
  let confetti = [];
  function spawnConfetti(count = 140) {
    confetti.length = 0;
    for (let i = 0; i < count; i++) {
      confetti.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 80,
        r: 4 + Math.random() * 6,
        c: colors[(Math.random() * colors.length) | 0],
        vx: -1 + Math.random() * 2,
        vy: 2 + Math.random() * 3,
        a: Math.random() * Math.PI * 2,
        va: -0.2 + Math.random() * 0.4,
      });
    }
    if (!animating) {
      animating = true;
      requestAnimationFrame(tick);
    }
  }

  let animating = false;
  function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    confetti.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.a += p.va;
      // wrap
      if (p.y > window.innerHeight + 20) p.y = -10;
      if (p.x > window.innerWidth + 10) p.x = -10;
      if (p.x < -10) p.x = window.innerWidth + 10;
      // draw
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.a);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
      ctx.restore();
    });
    if (confetti.length > 0) requestAnimationFrame(tick);
    else animating = false;
  }

  // Mischievous No button: move away on hover/focus
  let moveCount = 0;
  function moveNoButton() {
    const container = document.querySelector(".card");
    const rect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const maxLeft = Math.max(0, rect.width - btnRect.width - 10);
    const maxTop = Math.max(0, rect.height - btnRect.height - 10);

    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;

    noBtn.classList.add("mischief");
    noBtn.style.position = "absolute";
    noBtn.style.left = `${left}px`;
    noBtn.style.top = `${top}px`;
    moveCount++;
  }

  function escalateYesButton() {
    // make Yes bigger and more enticing after a few moves
    const scale = Math.min(1.6, 1 + moveCount * 0.08);
    yesBtn.style.transform = `scale(${scale})`;
  }

  function attachNoEvents() {
    ["mouseenter", "focus"].forEach((ev) => {
      noBtn.addEventListener(ev, () => {
        moveNoButton();
        escalateYesButton();
      });
    });
    noBtn.addEventListener("click", () => {
      // If somehow clicked, treat like a playful nudge and move again
      moveNoButton();
    });
  }

  function openModal() {
    try {
      modal.showModal();
    } catch (e) {
      // Fallback for older browsers that don't support <dialog>
      console.warn("Dialog.showModal not supported, using fallback", e);
      modal.setAttribute("open", "");
    }
    spawnConfetti();
    // Focus management
    setTimeout(() => closeModal.focus(), 50);
  }

  function closeTheModal() {
    if (typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
    confetti = [];
  }

  // Wire events
  yesBtn.addEventListener("click", openModal);
  closeModal.addEventListener("click", closeTheModal);
  modal.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeTheModal();
  });

  attachNoEvents();
})();
