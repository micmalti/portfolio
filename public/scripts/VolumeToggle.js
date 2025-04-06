const playIcon = document.getElementById("play");
const pauseIcon = document.getElementById("pause");
const musicText = document.getElementById("music-text");
const musicControl = document.getElementById("music-control");
const timelineContainer = document.getElementById("timeline-container");

// Audio Context Setup
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioSource;
let gainNode = audioContext.createGain();
gainNode.gain.value = 1;

let audioElement = new Audio("/assets/Journey_To_The_Far_Lands.mp3");
audioElement.loop = true;
let isPlaying = false;

// Initialize audio nodes on first interaction
function initAudioNodes() {
  if (!audioSource) {
    audioSource = audioContext.createMediaElementSource(audioElement);
    audioSource.connect(gainNode);
    gainNode.connect(audioContext.destination);
  }
}

// Unified fade-out function
async function fadeOut() {
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  return new Promise((resolve) => {
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.5, // 0.5s fade-out
    );

    setTimeout(() => {
      audioElement.pause();
      gainNode.gain.value = 1; // reset volume
      resolve();
    }, 1000);
  });
}

// Play with fade-in
async function playWithFade() {
  initAudioNodes();
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    1.0,
    audioContext.currentTime + 0.5, // 0.5s fade-in
  );
  await audioElement.play();
}

// Update UI state
function updateUI() {
  playIcon.classList.toggle("hidden", isPlaying);
  pauseIcon.classList.toggle("hidden", !isPlaying);
  musicText.textContent = isPlaying ? "Pause music" : "Play music";
  musicControl.classList.toggle("playing", isPlaying);
}

async function togglePlayback() {
  // Update UI state immediately before audio transitions
  isPlaying = !isPlaying;
  updateUI();

  try {
    if (!isPlaying) {
      // isPlaying already toggled, so logic is inverted
      await fadeOut();
    } else {
      await playWithFade();
    }
  } catch (error) {
    console.error("Playback error:", error);
    // Fallback to simple toggle if Web Audio fails
    isPlaying = !isPlaying;
    isPlaying ? audioElement.play() : audioElement.pause();
    updateUI();
  }
}

// Viewport observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && isPlaying) {
        togglePlayback(); // Will use the same fade-out as click
      }
    });
  },
  { threshold: 0.1 },
);

// Event listeners
document.getElementById("music-control").addEventListener("click", togglePlayback);
if (timelineContainer) observer.observe(timelineContainer);

// Handle browser tab switching
// document.addEventListener('visibilitychange', () => {
//   if (document.hidden && isPlaying) {
//     togglePlayback();
//   }
// });
