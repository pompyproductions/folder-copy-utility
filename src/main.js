const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");

const isDev = process.env.NODE_ENV !== "production"
const isMac = process.platform === "darwin"

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
  if (!canceled) {
    return fs.readdirSync(filePaths[0], {
      withFileTypes: true
    }).filter(dirent => dirent.isDirectory())
  }
}

async function handleSelectTarget() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
  if (!canceled) return (filePaths[0])
}

async function handleMkdir(event, options) {
  // return options
  console.log(options.folders);
  console.log(options.target);
  for (newFolder of options.folders) {
    fs.mkdirSync(path.join(options.target, newFolder), {recursive: true});
  }
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "Folder Viewer",
    width: isDev ? 1200 : 800,
    height: isDev ? 900 : 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  if (isDev) mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  ipcMain.handle("openFile", handleFileOpen);
  ipcMain.handle("selectTarget", handleSelectTarget);
  ipcMain.handle("makeFolderStructure", handleMkdir);
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
