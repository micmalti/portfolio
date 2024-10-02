document.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  const topSection = document.querySelector('#home');
  const sectionHeight = topSection.offsetHeight;
  
  if (window.scrollY > sectionHeight) {
    header.classList.remove('opacity-0', 'pointer-events-auto');
  } else {
    header.classList.add('opacity-0', 'pointer-events-auto');
  }
});
