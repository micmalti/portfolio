window.addEventListener('load', function() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to("#title", { duration:1.5, opacity:1 })
  gsap.to("#subtitle", { duration:1.5, opacity:1, delay:1})
  gsap.to("#arrow", { duration:2, opacity:1, delay:4})

//   gsap.to("#title", {
//     scrollTrigger: {
//         trigger: "#title",
//         start: "top center",
//         end: "bottom top",
//         scrub: true
//     },
//     duration: 1,
//     opacity: 0
//   });

//   gsap.to("#subtitle", {
//       scrollTrigger: {
//           trigger: "#subtitle",
//           start: "top center",
//           end: "bottom top",
//           scrub: true
//       },
//       duration: 1,
//       opacity: 0
//   });

//   gsap.to("#arrow", {
//     scrollTrigger: {
//         trigger: "#subtitle",
//         start: "top 0",
//         scrub: true
//     },
//     duration: 1,
//     opacity: 0
// });

});