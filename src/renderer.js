import "./sass/styles.scss";
import dirDisplay from "./modules/dirDisplay";
import filetypeDisplay from "./modules/filetypeDisplay";
import fileDrop from "./modules/fileDrop";
import domalt from "domalt";
import modals from "./modules/modals";
import enums from "./modules/enums";

// --
// references to ui elements

const icons = {
  settings: require("./svg/gear-solid.svg"),
  refresh: require("./svg/arrows-rotate-solid.svg"),
  expand: require("./svg/folder-tree-solid.svg"),
  close: require("./svg/xmark-solid.svg"),
  asterisk: require("./svg/asterisk-solid.svg"),
  swap: require("./svg/right-left-solid.svg")
}

const buttons = {
  source: document.getElementById("source-folder"),
  sourceOpts: document.getElementById("source-folder-opts"),
  target: document.getElementById("target-folder"),
  targetOpts: document.getElementById("target-folder-opts"),
  run: document.getElementById("run"),
}

const displays = {
  source: document.getElementById("source-path"),
  target: document.getElementById("target-path"),
  dirs: document.getElementById("source-contents"),
  filetypes: document.getElementById("filetypes"),
  overlay: document.querySelector(".dialog-overlay")
} 

// --
// current state variables

const dirents = [];
let targetDir;

// --
// dirent click handler

const handleDirentClick = (e) => {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  }
  const dirent = getDirentAt(
    findDirentIndex(e.target)
  )
  dirent.state = enums.DIRENT_STATES.DISABLED
  console.log(dirent);
}

const findDirentIndex = (elem) => {
  var position = [];
  if (elem.parentElement.classList.contains("dir")) {
    position = position.concat(findDirentIndex(elem.parentElement))
  }
  position.push(Array.from(elem.parentElement.children).indexOf(elem));
  return position
}

const getDirentAt = (pos) => {
  if (pos.length) {
    pos = pos.reverse();
    let dirent = dirents[pos.pop()];
    while (pos.length) {
      dirent = dirent.children[pos.pop()]
    }
    return dirent
  }
}

// --
// ui action handlers

function handleFileDrop(e) {
  e.preventDefault();
  console.log(e.dataTransfer.files[0].path)
}

function handleSourceOptions() {
  modals.displayDialog("sourceSettings")
  // displays.overlay.classList.add("active")
}
function handleTargetOptions() {
  modals.displayDialog("targetSettings")
  // displays.overlay.classList.add("active")
}

function handleOverlayOutsideClick(e) {
  if (e.target === displays.overlay) {
    displays.overlay.classList.remove("active")
  }
}

async function handleFolderRead() {
  const sourceFolder = await window.API.openFile();
  if (sourceFolder && sourceFolder.children.length) {
    displays.source.textContent = sourceFolder.fullPath;

    dirents.length = 0;
    for (let dirent of sourceFolder.children) {
      dirents.push(dirent)
    };
    dirDisplay.update(dirents);

    // the following is a bit overkill, since clicking the parent actually works.
    // consider adding the event listener to the display itself...
    Array.from(displays.dirs.children).forEach((elem) => {
      elem.addEventListener("click", handleDirentClick)
    }) 
    
    console.log(dirents);
    // filetypeDisplay.update(dirents);
  }
}

async function handleFolderTarget() {
  const dir = await window.API.selectTarget();
  if (dir) {
    displays.target.textContent = dir;
    targetDir = dir;
  }
}

async function handleFolderWrite() {
  console.log("click")
  if (!targetDir || !dirents) return; // error message actions here

  // const options = {
  //   dirents,
  //   filepath: targetDir,
  // };

  const result = await window.API.copyDirents(targetDir, dirents, []);
  // console.log(result);
}

buttons.source.addEventListener("click", handleFolderRead);
buttons.target.addEventListener("click", handleFolderTarget);
buttons.run.addEventListener("click", handleFolderWrite);
buttons.sourceOpts.addEventListener("click", handleSourceOptions)
buttons.targetOpts.addEventListener("click", handleTargetOptions)

displays.overlay.addEventListener("click", handleOverlayOutsideClick);
document.querySelector(".drop-overlay").addEventListener("drop", handleFileDrop);
document.querySelector(".drop-overlay").addEventListener("dragover", (e) => e.preventDefault());



// --
// populate SVG icons

document.querySelectorAll("[data-icon]").forEach(e => {
  const elem = document.createElement("div");
  elem.innerHTML = icons[e.getAttribute("data-icon")];
  e.appendChild(elem.children[0]);
})

// --
// drag and drop functionality

// counts the number of nested elements over which the cursor is being dragged
// so it shuts down on 0

let dragCounter = 0;
let isDragActive;
window.addEventListener("dragenter", (e) => {
  if (!isDragActive && e.dataTransfer && e.dataTransfer.types.indexOf("Files") !== -1) {
    fileDrop.activate();
    isDragActive = true;
    console.log("start");
  }
  dragCounter++;
  console.log({dragCounter})
});
window.addEventListener("dragleave", (e) => {
  if (isDragActive) {
    dragCounter--;
    console.log({dragCounter})
  }
  if (dragCounter === 0) {
    fileDrop.deactivate();
    isDragActive = false;
    console.log("end");
  }
})
window.addEventListener("dragover", (e) => e.preventDefault())
window.addEventListener("drop", (e) => {
  if (isDragActive) {
    dragCounter = 0;
    fileDrop.deactivate();
    isDragActive = false;
  }
})
