const { contextBridge, ipcRenderer } = require("electron");

console.log("PRELOAD GELADEN");

try {

    contextBridge.exposeInMainWorld("electron", {

        test: () => "Hallo vanuit preload",

        selectProjectFolder: () =>
            ipcRenderer.invoke("select-project-folder"),

        openFile: (filePath) =>
            ipcRenderer.invoke("open-file", filePath),

    });

    console.log("contextBridge OK");

} catch (err) {

    console.error("contextBridge FOUT", err);

}