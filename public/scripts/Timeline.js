window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.normalizeScroll(true);

  const container = document.getElementById("timeline-container");
  const timelineSections = document.querySelectorAll(".timeline");
  const navDots = document.querySelectorAll("#navigation-dots a");

  // Set IDs for sections
  timelineSections.forEach((section, i) => {
    section.id = `section${i + 1}`;
  });

  // Single timeline for both interactions
  const masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${timelineSections.length * 1000}`,
      scrub: 1,
      pin: "#about",
      markers: false,
      onUpdate: updateActiveDot, // Update dots on scroll
    },
    defaults: { duration: 0.5 }
  });

  // Function to update active dot
  function updateActiveDot() {
    const progress = masterTL.progress() * (timelineSections.length - 1);
    const activeIndex = Math.round(progress);
    navDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === activeIndex);
    });
  }

  // Set initial styles
  gsap.set(timelineSections, { opacity: 0, zIndex: 0 });
  gsap.set(timelineSections[0], { opacity: 1, zIndex: 1 });

  // Add animations with labels
  timelineSections.forEach((section, i) => {
    if (i > 0) {
      masterTL
        .addLabel(`section${i}`)
        .to(timelineSections[i - 1], { opacity: 0, zIndex: 0 }, `+=0.5`)
        .to(section, { opacity: 1, zIndex: 1 }, "<");
    }
  });
  masterTL.addLabel(`section${timelineSections.length}`);

  // Click handlers for dots
  navDots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      masterTL.tweenTo(`section${index + 1}`, {
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => updateActiveDot() // Update dot after tween completes
      });
      
      navDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });
});