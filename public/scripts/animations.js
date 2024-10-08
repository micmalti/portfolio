// Text: https://thinkingbox.com/
// Timeline: https://www.rcco.uk/about-us
// Smooth scrolling: https://productiveshop.com/padding-vs-margin/
// Show/hide contact button

document.addEventListener('DOMContentLoaded', (event) => {
  gsap.registerPlugin(ScrollTrigger);
  window.onload = function() {
    ScrollTrigger.create({
      trigger: "#about",
      start: "top 30%",
      onEnter: () => {
        gsap.from("#tagline", {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to("#highlight", {
          backgroundSize: "100% 100%",
          delay: 1,
          duration: 1,
          ease: "power2.inOut",
        });
        gsap.to("#hint", {
          opacity: 1,
          duration: 1,
          delay: 2.5,
          ease: "power2.out",
        });
      }
    });
  };
})

document.addEventListener('DOMContentLoaded', function() {
  let contactSection = document.getElementById('contact');
  let contactButton = document.querySelector('a[href="#contact"]');

  function getSectionPosition() {
    let rect = contactSection.getBoundingClientRect();
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      height: rect.height,
      bottom: rect.top + scrollTop + rect.height
    };
  }  // get position of #contact section

  function toggleButtonVisibility() {
    let sectionPos = getSectionPosition();
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let viewportHeight = window.innerHeight;
    let scrollBottom = scrollTop + viewportHeight;

    if (window.innerWidth >= 768) {
      let inView = (scrollBottom > sectionPos.top) && (scrollTop < sectionPos.bottom);
      if (inView) {
        contactButton.classList.add('md:hidden');
      } else {
        contactButton.classList.remove('md:hidden');
      }
    } else {
      contactButton.classList.add('md:hidden');
    }
  }  // update button visibility based on the scroll position

  toggleButtonVisibility();
  window.addEventListener('scroll', toggleButtonVisibility);  // listener to update button visibility
  window.addEventListener('resize', toggleButtonVisibility);  // listener to recheck visibility if screen resized
});