const { app, BrowserWindow, shell } = require("electron");
const { autoUpdater } = require("electron-updater");

const APP_URL = "https://illia-olha-hub.rocckk6339.chatgpt.site";
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 920,
    minHeight: 640,
    backgroundColor: "#101014",
    title: "Universal Chinazes",
    autoHideMenuBar: true,
    icon: `${__dirname}/assets/icon.png`,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadURL(APP_URL);
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(APP_URL)) return { action: "allow" };
    void shell.openExternal(url);
    return { action: "deny" };
  });
}

async function checkForUpdates() {
  if (!app.isPackaged) return;
  try {
    await autoUpdater.checkForUpdatesAndNotify();
  } catch {
    // The app remains usable if GitHub is temporarily unavailable.
  }
}

app.whenReady().then(() => {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  createWindow();
  void checkForUpdates();
  setInterval(checkForUpdates, 15 * 60 * 1000);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
