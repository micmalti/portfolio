window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    toggleClass: { className: "header-row--scrolled", targets: ".header-row" }
  });

  const collapseHeader = document.getElementById("collapse-header");
  const headerSpans = collapseHeader.querySelectorAll("span");
  const headerHeight = collapseHeader.offsetHeight;

  gsap.set(collapseHeader, { opacity: 1, height: headerHeight });
  gsap.set(headerSpans, { opacity: 1, y: 0 });

  ScrollTrigger.create({
    trigger: "body",
    start: "top top-=50",
    end: "top+=50 top",
    onEnter: () => {
      gsap.to(collapseHeader, {
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
      gsap.to(headerSpans, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut"
      });
    },
    onLeaveBack: () => {
      gsap.to(collapseHeader, {
        height: headerHeight,
        paddingTop: "1rem",
        paddingBottom: "3rem",
        duration: 0.4,
        ease: "power2.inOut"
      });
      gsap.to(headerSpans, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.inOut",
        delay: 0.1
      });
    },
    markers: false
  });
});
