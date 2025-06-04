document.querySelectorAll(".fade-to-black-trigger").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const overlay = document.getElementById("fade-overlay");

    if (!targetElement || !overlay) return;

    // Show the overlay (fade in)
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";

    // Update the URL without page reload
    history.pushState(null, null, targetId);

    // After the fade completes, jump to the section and fade out
    setTimeout(() => {
      targetElement.scrollIntoView({ behavior: "instant" }); // Immediate jump

      // Fade out the overlay
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }, 300); // Match this with the CSS transition duration (0.5s)
  });
});
