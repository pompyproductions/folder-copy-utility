const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("API", {
  openFile: () => ipcRenderer.invoke("openFile"),
  selectTarget: () => ipcRenderer.invoke("selectTarget"),
  copyDirents: (filepath, dirents, excludes) => ipcRenderer.invoke("copyDirents", filepath, dirents, excludes),
})