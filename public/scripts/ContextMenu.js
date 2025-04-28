document.addEventListener("DOMContentLoaded", function () {
  let wrappingElement;
  let observeHeaderTags;
  let allHeaderTags;

  function setCurrent(e) {
    var allSectionLinks = document.querySelectorAll(".toc-link");
    e.map((i) => {
      if (i.isIntersecting === true) {
        allSectionLinks.forEach((link) => link.classList.remove("toc-current"));
        const targetLink = document.querySelector(
          `a[href="#${i.target.id}"].toc-link`,
        );
        console.log("Ok");
        if (targetLink) targetLink.classList.add("toc-current");
        console.log("Hey");
      }
    });
  }

  function initTOC() {
    wrappingElement = document.querySelector("#markdown-content");
    if (wrappingElement !== null) {
      allHeaderTags = wrappingElement.querySelectorAll(
        ":scope > h1, :scope > h2, :scope > h3",
      );
    }

    let options = {
      root: null,
      rootMargin: "0px 0px -50% 0px",
      threshold: [1],
    };

    observeHeaderTags = new IntersectionObserver(setCurrent, options);
    if (wrappingElement === null) {
      return;
    }
    allHeaderTags.forEach((tag) => {
      tag.classList.add("scroll-mt-24");
      observeHeaderTags.observe(tag);
    });
  }

  initTOC();
  document.addEventListener("astro:after-swap", initTOC);
});