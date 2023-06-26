const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("API", {
  ping: () => ipcRenderer.invoke("pong")
})