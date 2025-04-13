function openModal() {
  document.getElementById("qrModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("qrModal").classList.add("hidden");
}

function copyToClipboard() {
  const addressText = document.getElementById("addressText").textContent;
  const defaultIcon = document.getElementById("defaultIcon");
  const successIcon = document.getElementById("successIcon");

  navigator.clipboard
    .writeText(addressText)
    .then(() => {
      defaultIcon.classList.add("hidden");
      successIcon.classList.remove("hidden");

      setTimeout(() => {
        defaultIcon.classList.remove("hidden");
        successIcon.classList.add("hidden");
      }, 1000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("qrModal").addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

  document.getElementById("copyButton").addEventListener("click", copyToClipboard);
});
