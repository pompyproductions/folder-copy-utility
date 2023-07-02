const path = require("path");
const fs = require("fs");

function getFolderStructure(dirpath, name = "root") {
  const result = {
    name,
    isDir: true,
    children: []
  };

  const children = fs.readdirSync(dirpath, { withFileTypes: true });

  for (let i = 0; i < children.length; i++) {
    if (children[i].isDirectory()) {
      result.children.push(getFolderStructure(path.join(dirpath, children[i].name), children[i].name));
    } else if (children[i].isFile()) {
      result.children.push({ name: children[i].name, isDir: false })
    }
  }

  return result;
}

module.exports = getFolderStructure;