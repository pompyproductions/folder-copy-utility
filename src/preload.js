const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("API", {
  openFile: () => ipcRenderer.invoke("openFile"),
  selectTarget: () => ipcRenderer.invoke("selectTarget"),
  copyDirents: (filepath, dirents, excludes) => ipcRenderer.invoke("copyDirents", filepath, dirents, excludes),
  dropFile: (filepath) => ipcRenderer.invoke("dropFile", filepath),
  minimizeWindow: () => ipcRenderer.invoke("minimizeWindow"),
  closeWindow: () => ipcRenderer.invoke("closeWindow"),
  toggleWindowExpand: () => ipcRenderer.invoke("toggleWindowExpand"),
  toggleWindowFullscreen: () => ipcRenderer.invoke("toggleWindowFullscreen"),
})