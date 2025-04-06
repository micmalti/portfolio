window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.normalizeScroll(true); // improved scrolling experience on mobile

  const container = document.getElementById("timeline-container");
  const timelineSections = document.querySelectorAll(".timeline");
  const navDots = document.querySelectorAll("#navigation-dots a");

  // Set IDs for sections (for navigation)
  timelineSections.forEach((section, i) => {
    section.id = `section${i + 1}`;
  });

  // Create a timeline for smooth transitions
  const masterTL = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${timelineSections.length * 1000}`, // Dynamic end based on section count
      scrub: 1,
      pin: "#about",
      // anticipatePin: 1,
      markers: false,
      onUpdate: (self) => {
        // Update navigation dots based on progress
        const progress = self.progress * (timelineSections.length - 1);
        const activeIndex = Math.round(progress);

        navDots.forEach((dot, i) => {
          if (i === activeIndex) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      },
    },
  });

  // Set initial styles
  gsap.set(timelineSections, {
    opacity: 0,
    zIndex: 0,
  });
  gsap.set(timelineSections[0], {
    opacity: 1,
    zIndex: 1,
  });

  // Create fade in/out animations for each section
  timelineSections.forEach((section, i) => {
    if (i > 0) {
      masterTL
        .to(
          timelineSections[i - 1],
          {
            opacity: 0,
            zIndex: 0,
            duration: 0.5,
          },
          `+=0.5`,
        )
        .to(
          section,
          {
            opacity: 1,
            zIndex: 1,
            duration: 0.5,
          },
          "<",
        );
    }
  });

  // Animate text movement for each section
  // timelineSections.forEach((section) => {
  //   const textContent = section.querySelector('.content');
  //   if (!textContent) return;

  //   ScrollTrigger.create({
  //     trigger: section,
  //     start: "top center",
  //     end: "bottom center",
  //     onEnter: () => {
  //       gsap.fromTo(textContent,
  //         { y: 100, opacity: 0 },
  //         { y: 0, opacity: 1, duration: 1 }
  //       );
  //     },
  //     onLeaveBack: () => {
  //       gsap.to(textContent,
  //         { y: -100, opacity: 0, duration: 0.5 }
  //       );
  //     }
  //   });
  // });

  // Handle navigation dot clicks
  // navDots.forEach((dot, i) => {
  //   dot.addEventListener('click', (e) => {
  //     e.preventDefault();

  //     // Calculate scroll position based on section index
  //     const scrollPos = (i / (timelineSections.length - 1)) *
  //                      (ScrollTrigger.getById("master").end - ScrollTrigger.getById("master").start);

  //     // Smooth scroll to position
  //     gsap.to(window, {
  //       scrollTo: scrollPos,
  //       duration: 1
  //     });
  //   });
  // });

  // Handle resize events
  // window.addEventListener('resize', function() {
  //   ScrollTrigger.refresh();
  // });
});
