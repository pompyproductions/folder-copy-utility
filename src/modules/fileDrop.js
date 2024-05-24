const overlay = document.querySelector(".drop-overlay");
const zones = {
  source: document.getElementById("drop-source"),
  target: document.getElementById("drop-target"),
}

const handleDragEnd = (e) => {
  // if (e.target !== overlay) return;
  deactivate();
}

const activate = () => {
  overlay.classList.add("active");

}
const deactivate = () => {
  overlay.classList.remove("active");
}

// overlay.addEventListener("dragleave", handleDragEnd);
overlay.addEventListener("dragover", (e) => {
  e.preventDefault();
});
// overlay.addEventListener("dragend", handleDragEnd);

// console.log(Object.keys(zones))
for (let key of Object.keys(zones)) {
  zones[key].addEventListener("dragover", (e) => {
    e.preventDefault();
    zones[key].classList.add("active")
  });
  zones[key].addEventListener("dragleave", (e) => {
    e.preventDefault();
    zones[key].classList.remove("active")
  })
  // zones[key].addEventListener("dragstart", (e) => e.preventDefault());
}

// overlay.addEventListener("drop", handleDragEnd);

export default { activate, deactivate };