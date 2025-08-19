const playIcon = document.getElementById("play");
const pauseIcon = document.getElementById("pause");
const musicText = document.getElementById("music-text");
const musicControl = document.getElementById("music-control");
const timelineContainer = document.getElementById("timeline-container");

let audioContext;
let audioSource;
let gainNode;
let audioElement;
let isPlaying = false;
let isChangingState = false;

async function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.gain.value = 1;

    audioElement = new Audio("/assets/Journey_To_The_Far_Lands.mp3");
    audioElement.loop = true;

    audioSource = audioContext.createMediaElementSource(audioElement);
    audioSource.connect(gainNode);
    gainNode.connect(audioContext.destination);

    audioElement.addEventListener("play", () => {
      isChangingState = false;
    });
  }
}

async function fadeOut() {
  return new Promise((resolve) => {
    const now = audioContext.currentTime;

    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    setTimeout(() => {
      audioElement.pause();
      resolve();
    }, 500);
  });
}

async function playWithFade() {
  try {
    await initAudio();

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    const now = audioContext.currentTime;
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(1.0, now + 0.5);

    await audioElement.play().catch((e) => {
      if (e.name !== "AbortError") throw e;
    });
  } catch (error) {
    console.error("Play error:", error);
    throw error;
  }
}

function updateUI() {
  playIcon.classList.toggle("hidden", isPlaying);
  pauseIcon.classList.toggle("hidden", !isPlaying);
  musicText.textContent = isPlaying ? "Pause music" : "Play music";
  musicControl.classList.toggle("playing", isPlaying);
}

async function togglePlayback() {
  if (isChangingState) return;
  isChangingState = true;

  const targetState = !isPlaying;
  isPlaying = targetState;
  updateUI();

  try {
    if (!targetState) {
      await fadeOut();
    } else {
      await playWithFade();
    }
  } catch (error) {
    console.error("Playback error:", error);
    isPlaying = !targetState;
    updateUI();
  } finally {
    isChangingState = false;
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && isPlaying) {
        togglePlayback();
      }
    });
  },
  { threshold: 0.1 }
);

document.addEventListener("DOMContentLoaded", () => {
  musicControl.addEventListener("click", togglePlayback);
  if (timelineContainer) observer.observe(timelineContainer);
});
