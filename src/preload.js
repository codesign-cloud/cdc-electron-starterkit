const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    versions: {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
    }
});