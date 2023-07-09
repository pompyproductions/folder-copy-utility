import domalt from "domalt";
const display = document.getElementById("filetypes")

const mergeSets = (target, source) => {
  if (typeof source !== "object") {
    target.add(source);
  } else {
    source.forEach((item) => target.add(item));
  }
  return target;
}

const getFileTypes = (dirent) => {
  if (!dirent.isDir) {
    return dirent.filetype
  } else {
    const filetypes = new Set();
    for (let child of dirent.children) {
      console.log(getFileTypes(child))
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