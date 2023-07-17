const overlay = document.querySelector(".drop-overlay");

const handleDragEnd = (e) => {
  if (e.target === overlay) deactivate();
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
// overlay.addEventListener("dragend", handleDragEnd);
overlay.addEventListener("drop", handleDragEnd);

export default { activate };