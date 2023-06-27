const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("API", {
  openFile: () => ipcRenderer.invoke("openFile"),
  selectTarget: () => ipcRenderer.invoke("selectTarget"),
  makeFolderStructure: (options) => ipcRenderer.invoke("makeFolderStructure", options),
})