window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".fade-element").forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 0,
      duration: 1.5,
      ease: "power1.out", // similar to cubic-bezier(0.25, 0.1, 0.25, 1)
      scrollTrigger: {
        trigger: element,
        start: "top 80%", // when top of element hits 80% of viewport
        toggleActions: "play none none none", // only play once when scrolling down
      },
    });
  });
});
