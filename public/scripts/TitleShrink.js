window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  const title = document.getElementById("title");
  const originalHeight = title.offsetHeight;
  const scaledHeight = originalHeight * 0.2;
  const offsetY = title.getBoundingClientRect().height * 0.375;

  gsap.to(title, {
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      endTrigger: "#about",
      end: `top-=${scaledHeight} center`,
      scrub: true,
      onLeave: () => {
        gsap.set(title, {
          position: "fixed",
          // top: 0,
          top: `${offsetY}px`,
          width: `${title.offsetWidth}px`,
          zIndex: 100,
          pointerEvents: "auto"
        });
      },
      onEnterBack: () => {
        title.classList.remove("fade-to-black-trigger");
        gsap.set(title, {
          position: "",
          top: "",
          width: "",
          zIndex: "",
          pointerEvents: "none"
        });
      }
    },
    // scale: 0.25,
    fontSize: "clamp(0.798rem, 0.6485rem + 0.7434vw, 1.853rem)",
    // lineHeight: "0.8",
    ease: "power2.out"
  });
});
