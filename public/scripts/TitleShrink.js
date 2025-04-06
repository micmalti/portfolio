// window.addEventListener("load", function () {
//   gsap.registerPlugin(ScrollTrigger);
//   gsap.create({
//     animation: gsap.from("#title", {
//       y: "50vh",
//       scale: 4,
//       yPercent: -50
//     }),
//     scrub: true,
//     trigger: "#about",
//     start: "top bottom",
//     endTrigger: '#about',
//     end: 'top center',
//     markers: false,
//     pin: true,
//     pinSpacing: false
//   });
// });

// window.addEventListener("load", function() {
//   gsap.registerPlugin(ScrollTrigger);

//   gsap.to("#title", {
//     scrollTrigger: {
//       trigger: "#about",
//       start: "top bottom",
//       end: "top center",
//       scrub: true,
//       markers: false
//     },
//     scale: 0.25,
//     yPercent: -100,
//     ease: "power4.out",
//     onUpdate: function() {
//       document.querySelector("#title").classList.add("pointer-events-none");
//       document.querySelector("#title").classList.add("z-50");
//       document.querySelector("#title").classList.add("pt-4");
//     },
//     onReverseComplete: function() {
//       document.querySelector("#title").classList.remove("pointer-events-none");
//       document.querySelector("#title").classList.remove("z-50");
//       document.querySelector("#title").classList.remove("pt-4");
//     }
//   });
// });

window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to("#title", {
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      endTrigger: "#about",
      end: "top center",
      scrub: true,
      onLeave: () => {
        gsap.set("#title", {
          position: "fixed",
          top: 40,
          zIndex: 100,
          pointerEvents: "auto",
        });
      },
      onEnterBack: () => {
        document.getElementById("title").classList.remove("fade-to-black-trigger");
        gsap.set("#title", {
          position: "",
          top: "",
          width: "",
          zIndex: "",
          pointerEvents: "none",
        });
      },
    },
    scale: 0.25,
    yPercent: -50,
    ease: "power2.out",
  });
});
