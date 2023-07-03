import "./sass/styles.scss"

const dirlist = document.querySelector("ul");
const direntsToCopy = [];
let targetDir;

// async function handleFolderRead() {
//   const dirs = await window.API.openFile();
//   if (dirs && dirs.length) {
//     dirlist.replaceChildren();
//     dirsToCopy.length = 0;
//     for (let dirent of dirs) {
//       const li = document.createElement("li");
//       li.textContent = dirent.name;
//       dirlist.append(li);
//       dirsToCopy.push(dirent.name);
//     }
//   }
//   console.log(dirsToCopy);
// }

async function handleFolderRead() {
  const sourceFolder = await window.API.openFile();
  if (sourceFolder && sourceFolder.children.length) {
    direntsToCopy.length = 0;
    for (let dirent of sourceFolder.children) {
      direntsToCopy.push(dirent)
    };
    updateFolderList();
  }
}

function updateFolderList() {
  dirlist.replaceChildren();
  for (let dirent of direntsToCopy) {
    const li = document.createElement("li");
    li.textContent = dirent.name;
    if (!dirent.isDir) {
      li.classList.add("file-item")
    }
    dirlist.append(li);
  }
}

async function handleFolderTarget() {
  const dir = await window.API.selectTarget();
  if (dir) {
    // document.getElementById("target-address").textContent = dir;
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

buttons.source.addEventListener("click", handleFolderRead);
buttons.target.addEventListener("click", handleFolderTarget);
buttons.run.addEventListener("click", handleFolderWrite);