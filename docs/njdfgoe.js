// ===============================
// ONE BUTTON CHAOS – SINGLE FILE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ===== ELEMENTS =====
  const btn = document.getElementById("chaosBtn");
  const bubbleWrap = document.getElementById("bubbleWrap");
  const popSound = document.getElementById("popSound");

  let clickCount = 0;

  // ===== UTILS =====
  const rand = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  /**
   * Shuffles an array in place using the Fisher-Yates algorithm.
   * This ensures the order of chaos changes every cycle.
   */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // ===== BUBBLE + SOUND =====
  function playClickFX() {
    bubbleWrap.classList.remove("animate");
    void bubbleWrap.offsetWidth; // Trigger reflow
    bubbleWrap.classList.add("animate");

    if (popSound) {
      popSound.currentTime = 0;
      popSound.play().catch(() => {});
    }

    navigator.vibrate?.(60);

    setTimeout(() => bubbleWrap.classList.remove("animate"), 600);
  }

  // ===== EFFECT DEFINITIONS =====
  function flash() {
    const f = document.createElement("div");
    f.style.cssText = `
      position:fixed;inset:0;
      background:white;
      opacity:.9;
      z-index:9999`;
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 80);
  }

  function bgColor() {
    document.body.style.background = `hsl(${rand(0, 360)}, 70%, 50%)`;
  }

  function shake() {
    document.body.animate(
      [{ transform: "translateX(0)" },
       { transform: "translateX(10px)" },
       { transform: "translateX(-10px)" },
       { transform: "translateX(0)" }],
      { duration: 300 }
    );
  }

  function runAway() {
    btn.style.position = "absolute";
    btn.style.left = rand(5, 80) + "vw";
    btn.style.top = rand(5, 80) + "vh";
  }

  function blurScreen() {
    document.body.style.filter = "blur(4px)";
    setTimeout(() => document.body.style.filter = "", 700);
  }

  function zoomPulse() {
    document.body.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.05)" }, { transform: "scale(1)" }],
      { duration: 400 }
    );
  }

  function darkFlip() {
    document.body.style.transition = "filter 0.3s";
    document.body.style.filter = "brightness(0.4)";
    setTimeout(() => document.body.style.filter = "", 800);
  }

  function buttonGlow() {
    btn.style.boxShadow = "0 0 20px #7d2ae8";
    setTimeout(() => btn.style.boxShadow = "", 600);
  }

  function screenTint() {
    document.body.style.background =
      `linear-gradient(120deg,
      hsl(${rand(0, 360)}, 70%, 50%),
      hsl(${rand(0, 360)}, 70%, 40%))`;
  }

  function ghostFade() {
    document.body.animate(
      [{ opacity: 1 }, { opacity: 0.2 }, { opacity: 1 }],
      { duration: 600 }
    );
  }

  function tiltSpin() {
    document.body.animate(
      [{ transform: "rotate(0deg)" },
       { transform: "rotate(1deg)" },
       { transform: "rotate(-1deg)" },
       { transform: "rotate(0deg)" }],
      { duration: 400 }
    );
  }

  function grayscale() {
    document.documentElement.style.filter = "grayscale(1)";
    setTimeout(() => document.documentElement.style.filter = "", 900);
  }

  function textChange() {
    const texts = ["Again.", "Why?", "Stop.", "Hmm.", "Interesting.", "Don’t."];
    btn.querySelector(".top").textContent = texts[rand(0, texts.length - 1)];
  }

  function fakeLag() {
    btn.disabled = true;
    setTimeout(() => btn.disabled = false, 700);
  }

  function delayedFlash() {
    setTimeout(flash, 600);
  }

  function hideCursor() {
    document.body.style.cursor = "none";
    setTimeout(() => document.body.style.cursor = "", 800);
  }

  function fakeWarning() {
    alert("⚠ Unexpected behavior detected.");
  }

  function resetReality() {
    document.body.style = "";
    btn.style = "";
    btn.querySelector(".top").textContent = "CLICK ME";
  }

  function nothing() {}
  function ignoreClick() {}

  // ===== QUEUE LOGIC =====
  
  // 1. Master list of all effects
  const effectsPool = [
    flash, bgColor, shake, runAway, blurScreen, 
    zoomPulse, darkFlip, buttonGlow, screenTint, 
    ghostFade, tiltSpin, grayscale, textChange, 
    fakeLag, delayedFlash, hideCursor, fakeWarning, 
    resetReality, nothing, ignoreClick
  ];

  // 2. Working array that will be depleted as effects run
  let availableEffects = [...effectsPool];
  
  // 3. Initial shuffle so the first cycle is random
  shuffle(availableEffects);

  // ===== MAIN TRIGGER =====
  btn.addEventListener("click", () => {
    playClickFX();
    clickCount++;

    // Pull the next effect from the front of the queue
    const effect = availableEffects.shift();
    
    // Execute the effect
    effect();

    // If no effects are left, reset and shuffle the list for the next cycle
    if (availableEffects.length === 0) {
      availableEffects = [...effectsPool];
      shuffle(availableEffects);
    }
  });

});