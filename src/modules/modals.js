import domalt from "domalt";
const iconClose = require("../svg/xmark-solid.svg")

const makeCloseButton = () => {
  const btn = domalt.newElem({tag: "button", class: "close", listeners: [["click", toggleOverlay]]});
  btn.innerHTML = iconClose;
  return btn
}

const makeCheckboxGroup = (name, label) => {
  return domalt.newElem({
    class: "input-pair",
    children: [
      { tag: "input", attributes: [["type", "checkbox"], ["name", name], ["id", name]] },
      { tag: "label", content: label, attributes: [["for", name]] }
    ]
  })
}

const makeRadioGroup = (name, value, label) => {
  return domalt.newElem({
    class: "input-pair",
    children: [
      { tag: "input", attributes: [["type", "radio"], ["name", name], ["id", value]] },
      { tag: "label", content: label, attributes: [["for", value]] }
    ]
  })
}

const overlay = document.querySelector(".dialog-overlay")
const templates = {
  sourceSettings: {
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
  targetSettings: {
    class: "dialog-container",
    children: [
      {
        tag: "h2",
        content: "Settings: Target folder",
      },
      makeCloseButton(),
      {
        class: "dialog-content",
        children: [
          makeRadioGroup("existing", "skip", "Skip existing files"),
          makeRadioGroup("existing", "overwrite", "Overwrite existing files"),
          makeRadioGroup("existing", "clear", "Delete all existing files/folders")
        ]
      },
    ],
  }
};

function toggleOverlay() {
  overlay.classList.toggle("active");
}

function displayDialog(name) {
  overlay.replaceChildren();
  overlay.append(domalt.newElem(templates[name]));
  toggleOverlay();
}

export default { displayDialog }