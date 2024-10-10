const tagline = new SplitType('#tagline')

gsap.from('.char', {
  yPercent: 130,
  stagger: 0.02,
  delay: 0.2,
  duration: 0.1,
  scrollTrigger: {
    trigger: '#tagline',
    start: 'top 80%'
  }

})
