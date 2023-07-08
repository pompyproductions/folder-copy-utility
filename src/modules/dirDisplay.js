import domalt from "domalt";
const display = document.getElementById("source-contents");

const newElemDirent = (dirent, indent = 0) => {
  const elem = domalt.newElem({
    class: "dirent",
    listeners: [["click", (e) => console.log("click on dirent!")]],
    content: dirent.name,
    style: {
      "margin-left": `${indent * 12}px`,
     }
  });
  if (dirent.isDir && dirent.children.length) {
    elem.classList.add("dir");
    indent++;
    for (let child of dirent.children) {
      elem.append(newElemDirent(child, indent));
    }
  }
  return elem;
}

const update = (dirents) => {
  if (!dirents.length) return;
  display.replaceChildren();
  dirents = dirents.sort((a, b) => !a.isDir && b.isDir ? 1 : -1);
  for (let dirent of dirents) {
    display.append(newElemDirent(dirent));
  }
}



export default { update };