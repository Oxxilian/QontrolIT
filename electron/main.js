console.log("MAIN.JS GELADEN");

const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const path = require("path");

function createWindow() {

    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        minWidth: 1280,
        minHeight: 720,
        title: "QontrolIT",
        autoHideMenuBar: true,

        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    // Altijd gemaximaliseerd openen
    win.maximize();

    // DevTools openen (alleen tijdens development)
    win.webContents.openDevTools();

    win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {

    ipcMain.handle("select-project-folder", async () => {

        const result = await dialog.showOpenDialog({
            title: "Selecteer projectmap",
            properties: ["openDirectory"],
        });

        if (result.canceled) {
            return null;
        }

        return result.filePaths[0];

    });

    ipcMain.handle("open-file", async (event, filePath) => {

        const result = await shell.openPath(filePath);

        if (result !== "") {
            throw new Error(result);
        }

        return true;

    });

    createWindow();

});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {
        app.quit();
    }

});