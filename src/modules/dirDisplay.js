import domalt from "domalt";
const display = document.getElementById("dirents");
const header = document.querySelector("main .list-header");
const tooltips = {
  expand: "Collapse/expand all items",
  refresh: "Refresh folder contents",
  swap: "Swap"
}
let timeoutID;

const handleTooltipEnter = (e) => {
  const text = tooltips[e.target.getAttribute("data-icon")];
  const tooltipDisplay = header.querySelector("p");
  tooltipDisplay.textContent = text;
  tooltipDisplay.classList.remove("hidden");
  if (timeoutID) clearTimeout(timeoutID);
  timeoutID = setTimeout(handleTooltipTimeout, 2000);
  tooltipDisplay.classList.add("active");
}
const handleTooltipLeave = (e) => {
  header.querySelector("p").classList.remove("active");
}
const handleTooltipTimeout = (e) => {
  header.querySelector("p").classList.add("hidden");
}

const newElemDirent = (dirent, indent = 0) => {
  const elem = domalt.newElem({
    class: "dirent",
    listeners: [["click", (e) => console.log("click on dirent!")]],
    content: dirent.name,
    style: {
      "margin-left": `${indent * 12}px`,
     }
  });
  if (dirent.isDir && dirent.children.length) {
    elem.classList.add("dir");
    indent++;
    for (let child of dirent.children) {
      elem.append(newElemDirent(child, indent));
    }
  }
  return elem;
}

const update = (dirents) => {
  if (!dirents.length) return;
  display.replaceChildren();
  dirents = dirents.sort((a, b) => !a.isDir && b.isDir ? 1 : -1);
  for (let dirent of dirents) {
    display.append(newElemDirent(dirent));
  }
}

header.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("mouseenter", handleTooltipEnter);
  btn.addEventListener("mouseleave", handleTooltipLeave);
})

export default { update };