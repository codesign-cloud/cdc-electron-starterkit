const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // App information
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Platform information
  platform: process.platform,
  versions: process.versions,
  
  // Future API methods can be added here
  // Example: openExternal: (url) => ipcRenderer.invoke('open-external', url),
});

// Log that preload script has loaded
console.log('Preload script loaded successfully');