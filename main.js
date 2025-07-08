const { app, BrowserWindow } = require("electron");
const path = require("path");

let vaultPath;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("public/index.html");
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  const userDataPath = app.getPath("userData");
  vaultPath = path.join(userDataPath, "vault.json");

  console.log("Vault path:", vaultPath);

  createWindow();
});
