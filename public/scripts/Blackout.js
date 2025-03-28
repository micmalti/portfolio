window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to("#title", { duration: 1.5, opacity: 1 });
  gsap.to("#subtitle", { duration: 1.5, opacity: 1, delay: 1 });
  gsap.to("#arrow", { duration: 1, opacity: 1, delay: 2.5 });

  gsap.to("#title-container", {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#home",
      start: "center center",
      end: "bottom center",
      scrub: true,
    },
  });

  gsap.to("#arrow-container", {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: "#home",
      start: "10% top",
      end: "center center",
      scrub: true,
    },
  });
});
