import domalt from "domalt";
const iconClose = require("../svg/xmark-solid.svg")

const makeCloseButton = () => {
  const btn = domalt.newElem({tag: "button", class: "close", listeners: [["click", toggleOverlay]]});
  btn.innerHTML = iconClose;
  return btn
}

const makeCheckboxGroup = (name, label) => {
  return domalt.newElem({
    class: "checkbox-group",
    children: [
      { tag: "input", attributes: [["type", "checkbox"], ["name", name], ["id", name]] },
      { tag: "label", content: label, attributes: [["for", name]] }
    ]
  })
}

const overlay = document.querySelector(".dialog-overlay")
const templates = {
  sourceSettings: {
    tag: "div",
    class: "dialog-container",
    children: [
      {
        tag: "h2",
        content: "Settings: Source folder",
      },
      makeCloseButton(),
      {
        class: "dialog-content",
        children: [
          makeCheckboxGroup("include-files", "Include files (slower)"),
          makeCheckboxGroup("recursive", "Include subfolders (recursive)"),
        ]
      },
    ],
  },
};

function toggleOverlay() {
  overlay.replaceChildren();
  overlay.append(domalt.newElem(templates.sourceSettings));
  overlay.classList.toggle("active");
}

function displayDialog(name) {
  // switch (name) {
  //   case "sourceSettings":
      
  // }
  toggleOverlay();
}

export default { displayDialog }