document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const split = new SplitType("#tagline");

  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: "#home",
        start: "20% top",
        end: "120% center",
        scrub: 0.5
      }
    })
    .set(
      split.chars,
      {
        duration: 0.3,
        color: "white",
        stagger: 0.1
      },
      0.1
    );
});
