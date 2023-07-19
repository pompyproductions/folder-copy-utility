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

const hello = () => {
  console.log("hello");
}

overlay.addEventListener("dragleave", handleDragEnd);
overlay.addEventListener("dragover", (e) => {
  e.preventDefault()
});
overlay.addEventListener("dragend", handleDragEnd);

// console.log(Object.keys(zones))
for (let key of Object.keys(zones)) {
  zones[key].addEventListener("dragover", (e) => e.preventDefault());
  zones[key].addEventListener("dragstart", (e) => e.preventDefault());
  zones[key].addEventListener("mouseenter", () => zone.classList.add("active"))
  zones[key].addEventListener("mouseleave", () => zone.classList.remove("active"))
}

// overlay.addEventListener("drop", handleDragEnd);

export default { activate, deactivate };