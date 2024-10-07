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
  var contactSection = document.getElementById('contact'); // The section where the button should be hidden
  var contactButton = document.querySelector('a[href="#contact"]'); // The contact button itself
  
  // Get position of #contact section
  function getSectionPosition() {
      var rect = contactSection.getBoundingClientRect();
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      return {
          top: rect.top + scrollTop,
          height: rect.height,
          bottom: rect.top + scrollTop + rect.height
      };
  }
  
  // Update the button visibility based on the scroll position
  function toggleButtonVisibility() {
      var sectionPos = getSectionPosition();
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var viewportHeight = window.innerHeight;
      var scrollBottom = scrollTop + viewportHeight;

      // Check if the contact section is in view
      var inView = (scrollBottom > sectionPos.top) && (scrollTop < sectionPos.bottom);
      
      // Toggle the visibility of the contact button
      if (inView) {
          contactButton.classList.add('hidden');
      } else {
          contactButton.classList.remove('hidden');
      }
  }

  // Initial check on page load
  toggleButtonVisibility();

  // Add scroll event listener to update the button visibility
  window.addEventListener('scroll', toggleButtonVisibility);
});
