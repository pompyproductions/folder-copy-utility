import domalt from "domalt";
const display = document.getElementById("filetypes")

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

export default { update };