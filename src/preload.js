const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("API", {
  openFile: () => ipcRenderer.invoke("openFile"),
  selectTarget: () => ipcRenderer.invoke("selectTarget"),
  copyDirents: (filepath, dirents, excludes) => ipcRenderer.invoke("copyDirents", filepath, dirents, excludes),
  dropFile: (filepath) => ipcRenderer.invoke("dropFile", filepath),
  minimizeWindow: () => ipcRenderer.invoke("minimizeWindow"),
  expandWindow: () => ipcRenderer.invoke("expandWindow"),
  closeWindow: () => ipcRenderer.invoke("closeWindow"),
})