document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('title');
  const contact = document.getElementById('contact');

  if (contact && title) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            title.classList.remove('hover:mix-blend-normal');
          } else {
            title.classList.add('hover:mix-blend-normal');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(contact);
  }
});