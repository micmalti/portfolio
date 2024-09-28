document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");

  horizontalLoop(boxes, {
    speed: 0.5,  // 1 = 100px/sec
    paddingRight: 0,
    snap: false,
    repeat: -1,
  });
});
