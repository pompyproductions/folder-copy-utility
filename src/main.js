const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");
const getFolderStructure = require("./modules/getFolderStructure");
const copyDirentRecursive = require("./modules/copyDirents");

const isDev = process.env.NODE_ENV !== "production"
const isMac = process.platform === "darwin"

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
  if (!canceled) {
    return getFolderStructure(filePaths[0]);
    // fs.readdirSync(filePaths[0], {
    //   withFileTypes: true
    // }).filter(dirent => dirent.isDirectory())
  }
  return false
}

async function handleFileDrop(event, filepath) {
  // console.log(filepath)
  return getFolderStructure(filepath)
}

async function handleSelectTarget() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
  if (!canceled) return (filePaths[0])
}

async function handleCopy(event, filepath, dirents, excludes) {
  dirents.forEach(dirent => copyDirentRecursive(
    filepath, dirent, excludes
  ))
}

function handleWindowClose() {
  BrowserWindow.getFocusedWindow().close()
}

function handleWindowExpand() {
  const win = BrowserWindow.getFocusedWindow();
  if (win.isMaximized()) {
    win.unmaximize()
  } else {
    win.maximize()
  }
}

function handleWindowMinimize() {
  BrowserWindow.getFocusedWindow().minimize()
}

function handleWindowFullscreen() {
  const win = BrowserWindow.getFocusedWindow();
  win.setFullScreen(!win.isFullScreen())
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "FLEM",
    width: isDev ? 1500 : 1000,
    height: isDev ? 900 : 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    titleBarStyle: "hidden",
    backgroundColor: "#191c1b",
    icon: path.join(__dirname, 'icons/FLEM_WHITE-DARK-24px.png'),
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (isDev) mainWindow.webContents.openDevTools();

  return mainWindow
};


// ---
// find these bindings in preload.js

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', () => {
  ipcMain.handle("openFile", handleFileOpen);
  ipcMain.handle("selectTarget", handleSelectTarget);
  ipcMain.handle("copyDirents", handleCopy);
  ipcMain.handle("dropFile", handleFileDrop);
  ipcMain.handle("closeWindow", handleWindowClose);
  ipcMain.handle("minimizeWindow", handleWindowMinimize);
  ipcMain.handle("toggleWindowExpand", handleWindowExpand);
  ipcMain.handle("toggleWindowFullscreen", handleWindowFullscreen);
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
