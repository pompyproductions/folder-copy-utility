const path = require("path");
const fs = require("fs");

const copyDirentRecursive = (targetPath, dirent, excludes = []) => {
  // for (let dirent of dirents) {
  //   const newPath = path.join(rootPath, dirent.name);
  //   if (dirent.isDir) {
  //     fs.mkdirSync(newPath);
  //     for (let child of dirent.children) {
  //       if (child.isDir) 
  //       copyDirents(path.join(newPath), child.children, excludes);
  //     }
  //   } else {
  //     // check for excludes here
  //     fs.copyFileSync(dirent.fullPath, newPath)
  //   }
  // }
  const filePath = path.join(targetPath, dirent.name);
  if (dirent.isDir) {
    if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
    for (let child of dirent.children) {
      copyDirentRecursive(filePath, child, excludes)
    }
  } else {
    // check for excludes here
    if (!fs.existsSync(filePath)) fs.copyFileSync(dirent.fullPath, filePath)
  }
}

module.exports = copyDirentRecursive;