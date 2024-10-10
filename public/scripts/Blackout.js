window.addEventListener('load', function() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to("#title", { duration:1.5, opacity:1 })
  gsap.to("#subtitle", { duration:1.5, opacity:1, delay:1})
  gsap.to("#arrow", { duration:1, opacity:1, delay:4})
});