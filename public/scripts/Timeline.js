// window.addEventListener('load', function() {
//   const sections = document.querySelectorAll('.timeline');
//   const navLinks = document.querySelectorAll('.principle__nav-dot');
//   const progressBar = document.querySelector('#progress-bar');

//   gsap.registerPlugin(ScrollTrigger);

//   function removeActiveClass() {
//     navLinks.forEach(link => link.classList.remove('active'));
//   }

//   sections.forEach((section, index) => {
//     ScrollTrigger.create({
//       trigger: section,
//       start: "top center",
//       end: "bottom center",
//       onEnter: () => {
//         removeActiveClass();
//         navLinks[index].classList.add('active');
//       },
//       onEnterBack: () => {
//         removeActiveClass();
//         navLinks[index].classList.add('active');
//       },
//       onLeave: () => {
//         navLinks[index].classList.remove('active');
//       },
//       onLeaveBack: () => {
//         navLinks[index].classList.remove('active');
//       }
//     });
//   });

//   gsap.to(sections, {
//     xPercent: -100 * (sections.length - 1),
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".sections-wrapper",
//       pin: true,
//       scrub: 1,
//       snap: 1 / (sections.length - 1),
//       end: () => "+=" + (document.querySelector('#sections-wrapper').offsetWidth * 2), // increase end value to reduce scroll sensitivity
//       onUpdate: self => {
//         const progress = self.progress;
//         progressBar.style.width = `${progress * 100}%`;
//       }
//     }
//   });
// });


window.addEventListener('load', function() {
  const sections = document.querySelectorAll('.timeline');
  const progressBar = document.querySelector('#progress-bar');

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: "#sections-wrapper",
      pin: true,
      scrub: 3,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + (document.querySelector('#sections-wrapper').offsetWidth * 2), // increase end value to reduce scroll sensitivity
      onUpdate: self => {
        const progress = self.progress;
        progressBar.style.width = `${progress * 100}%`;
      }
    }
  });
});

