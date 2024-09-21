document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".rule-section");
    let currentIndex = 0;
  
    function showSection(index) {
      sections.forEach((section, i) => {
        section.classList.toggle("hidden", i !== index);
      });
    }
  
    document.getElementById("nextButton").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % sections.length;
      showSection(currentIndex);
    });
  
    document.getElementById("prevButton").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + sections.length) % sections.length;
      showSection(currentIndex);
    });
  
    // Show the first section initially
    showSection(currentIndex);
  });
  