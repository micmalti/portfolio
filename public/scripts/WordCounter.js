window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Set initial value to 0 (avoids NaN)
  document.querySelector("#word-counter").textContent = "0";

  gsap.fromTo(
    "#word-counter",
    { textContent: 0 },
    {
      textContent: 80000,
      duration: 2,
      snap: { textContent: 1000 },
      modifiers: {
        textContent: function (value) {
          return Math.floor(value).toLocaleString();
        },
      },
      scrollTrigger: {
        trigger: "#word-counter",
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
      },
    },
  );
});
