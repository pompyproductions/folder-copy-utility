const path = require("path");
const fs = require("fs");
const enums = require("./enums");

function getFolderStructure(dirpath, name = "root", options = { getFiles: false }) {
  const result = {
    name,
    isDir: true,
    state: enums.DIRENT_STATES.ACTIVE,
    fullPath: dirpath,
    children: [],
  };

  const children = fs.readdirSync(dirpath, { withFileTypes: true });

  for (let i = 0; i < children.length; i++) {
    const newPath = path.join(dirpath, children[i].name);
    if (children[i].isDirectory()) {
      result.children.push(getFolderStructure(newPath, children[i].name));
    // }
    } else if (options.getFiles && children[i].isFile()) {
      const childFile = {
        name: children[i].name,
        isDir: false,
        fullPath: newPath,
        state: enums.DIRENT_STATES.DISABLED
      };
      const extension = childFile.name.match(/\.[^.]+$/);
      if (extension) childFile.filetype = extension[0];
      result.children.push(childFile);
    }
  }
  result.children = result.children.sort((a, b) =>
    !a.isDir && b.isDir ? 1 : -1
  );

  return result;
}

module.exports = getFolderStructure;
