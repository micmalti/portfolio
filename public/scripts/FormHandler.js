if (typeof window !== "undefined") {
  let viewport = document.querySelector("meta[name=viewport]");
  if (viewport) {
    viewport.setAttribute("content", `${viewport.content}, height=${window.innerHeight}`);
  }
  window.addEventListener("resize", () => {
    viewport.setAttribute("content", `${viewport.content}, height=${window.innerHeight}`);
  });
}
