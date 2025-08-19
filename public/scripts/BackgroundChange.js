document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  let options = { threshold: 0.5 };
  let currentColor = getComputedStyle(document.body).backgroundColor;

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetColor = entry.target.getAttribute("data-color");
        if (targetColor && targetColor !== currentColor) {
          gsap.to(document.body, {
            backgroundColor: targetColor,
            duration: 0.5, // Transition duration in seconds
            ease: "power1.out" // Easing function for smoothness
          });
          currentColor = targetColor;
        }
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
