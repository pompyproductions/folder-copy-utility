import domalt from "domalt";
const display = document.getElementById("filetypes");
const header = document.querySelector("aside .list-header");
const tooltips = {
  swap: "Swap",
  asterisk: "Select all",
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

const mergeSets = (target, source) => {
  if (!source) return target; // can continue looping
  if (typeof source !== "object") {
    target.add(source);
  } else {
    source.forEach((item) => target.add(item));
  }
  return target;
}

const getFileTypes = (dirent) => {
  if (!dirent.isDir) { 
    return dirent.filetype // null is ok, it's checked against in "mergeSets"
  } else {
    const filetypes = new Set();
    for (let child of dirent.children) {
      mergeSets(filetypes, getFileTypes(child))
    }
    return filetypes
  }
}

const update = (dirents) => {
  display.replaceChildren()
  const filetypes = new Set();
  for (let dirent of dirents) {
    mergeSets(filetypes, getFileTypes(dirent))
  }
  for (let ext of [...filetypes].sort()) {
    display.append(domalt.newElem({
      content: ext
    }))
  }
}

header.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("mouseenter", handleTooltipEnter);
  btn.addEventListener("mouseleave", handleTooltipLeave);
})

export default { update };