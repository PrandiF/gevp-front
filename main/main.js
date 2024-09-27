import { app, BrowserWindow, ipcMain }  from ("electron");
import path  from ("path");

let appServe = null;

const loadAppServe = async () => {
  if (app.isPackaged) {
    const { default: serve } = await import("electron-serve");
    appServe = serve({
      directory: path.join(__dirname, "resources/app/dist"),
    });
  }
};

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
    },
  });

  win.maximize();
  win.removeMenu();

  if (app.isPackaged) {
    await appServe(win);
    win.loadURL("app://-");
  } else {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
    win.webContents.on("did-fail-load", () => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

app.whenReady().then(async () => {
  await loadAppServe(); // Asegúrate de cargar appServe antes de crear la ventana
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


