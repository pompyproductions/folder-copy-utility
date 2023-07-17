import "./sass/styles.scss";
import dirDisplay from "./modules/dirDisplay";
import filetypeDisplay from "./modules/filetypeDisplay";
import fileDrop from "./modules/fileDrop";
import domalt from "domalt";
import modals from "./modules/modals";

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

const dirents = [];
let targetDir;
let isDragActive = false;

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
    filetypeDisplay.update(dirents);
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
// document.querySelector(".drop-overlay").addEventListener("drop", handleFileDrop);
// document.querySelector(".drop-overlay").addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("dragenter", (e) => {
  if (!isDragActive && e.dataTransfer && e.dataTransfer.types.indexOf("Files") !== -1) {
    fileDrop.activate();
    console.log("dragging!")
  }
  // e.preventDefault();
  // console.log("hey");
  // e.stopPropagation();
});
// window.addEventListener("dragend", (e) => {
//   if (isDragActive) {
//     isDragActive = false;
//     console.log("end drag!")
//     document.querySelector("body").style.background = ""
//   }
// })
// window.addEventListener("drop", (e) => {
//   if (isDragActive) {
//     isDragActive = false;
//     console.log("end drag!")
//     document.querySelector("body").style.background = ""
//   }
// })

// window.addEventListener("dragleave", (e) => {
//   // e.preventDefault();
//   e.stopPropagation();
//   console.log("ho");
//   document.querySelector("body").style.background = ""
// })

document.querySelectorAll("[data-icon]").forEach(e => {
  const elem = document.createElement("div");
  elem.innerHTML = icons[e.getAttribute("data-icon")];
  e.appendChild(elem.children[0]);
})