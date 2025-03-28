const volumeIcon = document.getElementById("play");
const playerIcon = document.getElementById("mute");

let audio = new Audio("/assets/Journey_To_The_Far_Lands.mp3");
audio.loop = true;

let isPlaying = false;

function togglePlayer() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;

  volumeIcon.classList.toggle("hidden", isPlaying);
  playerIcon.classList.toggle("hidden", !isPlaying);
}

document.getElementById("icon-toggle").addEventListener("click", togglePlayer);
