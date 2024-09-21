// public/autoScroll.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let lastScrollY = window.scrollY;
  
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.9, 1], // Trigger at different points of visibility
    };
  
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const isScrollingDown = window.scrollY > lastScrollY;
          lastScrollY = window.scrollY;
  
          // Determine scroll direction and visibility
          const entryBounding = entry.boundingClientRect;
          const rootBounding = observer.root ? observer.root.getBoundingClientRect() : {
            top: 0, bottom: window.innerHeight
          };
  
          if (isScrollingDown) {
            if (entryBounding.bottom > rootBounding.bottom) {
              entry.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            if (entryBounding.top < rootBounding.top) {
              entry.target.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
          }
        }
      });
    };
  
    const observer = new IntersectionObserver(callback, options);
    sections.forEach(section => observer.observe(section));
  });  