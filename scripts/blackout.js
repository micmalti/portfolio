document.addEventListener('DOMContentLoaded', (event) => {
  gsap.registerPlugin(ScrollTrigger);

  let homeSection = document.querySelector("#home");

  if (homeSection) {
    gsap.defaults({overwrite: 'auto', duration: 1});
    gsap.set("body", {height: "100%"});

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: homeSection,
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: false,
        pin: true,
        onToggle: self => self.isActive && setSection(homeSection),
        onLeave: () => {
          gsap.to(homeSection, { autoAlpha: 0, duration: 0.5 });
        },
      }
    });

    const contents = q(".md\\:items-centerflex"); // selector may need to be adjusted based on HTML structure
    tl.to(contents, { autoAlpha: 0, duration: 2 }, 0);
    const q = gsap.utils.selector(homeSection);

    function setSection(newSection) {
      var tl = gsap.timeline();
      tl.to(newSection, { autoAlpha: 1, duration: 0.5 });
    }
  }
});