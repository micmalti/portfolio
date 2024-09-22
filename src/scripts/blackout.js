gsap.registerPlugin(ScrollTrigger);

let homeSection = document.querySelector("#home");

if (homeSection) {
  gsap.defaults({overwrite: 'auto', duration: 1});
  gsap.set("body", {height: "100%"});

  var tl = gsap.timeline({
    scrollTrigger: {
      start: () => -0.5 * innerHeight,
      end: () => 1.5 * innerHeight,
      scrub: true,
      markers: true,
      onToggle: self => self.isActive && setSection(homeSection)
    }
  });

  const q = gsap.utils.selector(homeSection);

  function setSection(newSection) {
    var tl = gsap.timeline();
    tl.to("h1", { y: -30, autoAlpha: 0, duration: 0.3 });
    tl.to(newSection, { autoAlpha: 1, duration: 0.5 });
    tl.to("h1", { y: -30, autoAlpha: 1, duration: 0.3 });
  }
}
