import "./sass/styles.scss"
const direntsToCopy = [];
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

function updateFolderList() {
  displays.dirs.replaceChildren();
  for (let dirent of direntsToCopy) {
    const li = document.createElement("li");
    li.textContent = dirent.name;
    if (!dirent.isDir) {
      li.classList.add("file-item")
    }
    displays.dirs.append(li);
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