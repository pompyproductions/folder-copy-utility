import "./sass/styles.scss"
const direntsToCopy = [];
const domalt = require("domalt");
let targetDir;

async function handleFolderRead() {
  const sourceFolder = await window.API.openFile();
  if (sourceFolder && sourceFolder.children.length) {
    displays.source.textContent = sourceFolder.fullPath;
    direntsToCopy.length = 0;
    for (let dirent of sourceFolder.children) {
      direntsToCopy.push(dirent)
    };
    updateFolderList();
  }
}

function makeDirentElement(dirent, hidden = false, indent = 0) {
  const elem = document.createElement("div");
  elem.classList.add("dirent");
  elem.addEventListener("click", (e) => {
    for (let child of e.target.children) {
      child.classList.toggle("hidden")
    }
  })
  if (hidden) elem.classList.add("hidden");
  if (indent) elem.style.marginLeft = `${indent}rem`
  elem.textContent = dirent.name;
  if (dirent.isDir) {
    elem.classList.add("dir");
    indent++;
    for (let child of dirent.children) {
      elem.append(makeDirentElement(child, true, indent));
    }
  }
  return elem;
}

function updateFolderList() {
  displays.dirs.replaceChildren();
  const folderList = direntsToCopy.sort((a, b) => !a.isDir && b.isDir ? 1 : -1)
  for (let dirent of folderList) {
    displays.dirs.append(makeDirentElement(dirent));
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
  if (!targetDir || !dirsToCopy) return;
  const options = {
    target: targetDir,
    folders: dirsToCopy
  };
  const result = await window.API.makeFolderStructure(options);
  console.log(result);
}

const buttons = {
  source: document.getElementById("source-folder"),
  target: document.getElementById("target-folder"),
  run: document.getElementById("run")
}

const displays = {
  source: document.getElementById("source-path"),
  target: document.getElementById("target-path"),
  dirs: document.getElementById("source-contents"),
  filetypes: document.getElementById("filetypes")
}

buttons.source.addEventListener("click", handleFolderRead);
buttons.target.addEventListener("click", handleFolderTarget);
buttons.run.addEventListener("click", handleFolderWrite);