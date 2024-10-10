window.addEventListener('load', function() {
  const sections = document.querySelectorAll('.timeline');
  const progressBar = document.querySelector('.progress-bar');

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".sections-wrapper",
      pin: true,
      scrub: 3,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + (document.querySelector('.sections-wrapper').offsetWidth * 2), // increase end value to reduce scroll sensitivity
      onUpdate: self => {
        const progress = self.progress;
        progressBar.style.width = `${progress * 100}%`;
      }
    }
  });
});
