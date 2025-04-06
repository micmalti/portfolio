document.addEventListener("DOMContentLoaded", function () {
  const wordCounter = document.getElementById("word-counter");
  const desc = document.getElementById("blog-desc");

  if (wordCounter && desc) {
    const counterWidth = wordCounter.offsetWidth + "px";
    desc.style.setProperty("--counter-width", counterWidth);
  }
});
