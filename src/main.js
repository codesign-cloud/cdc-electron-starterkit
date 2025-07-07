// Enable live reload for Electron in development
if (process.env.NODE_ENV === 'development') {
    try {
        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true,
            ignore: [
                /node_modules|[\/\\]\./
                // Don't ignore dist folder - we want to watch for bundle changes
            ]
        });
    } catch (error) {
        console.log('Error loading electron-reloader:', error);
    }
}

const { app, BrowserWindow, ipcMain, session, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const isDevelopment = process.env.NODE_ENV === 'development';

// Import chokidar for better file watching in development
let chokidar;
if (isDevelopment) {
    try {
        chokidar = require('chokidar');
    } catch (error) {
        console.log('Chokidar not available, using fs.watchFile fallback');
    }
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            sandbox: false
        },
        show: false, // Don't show until ready-to-show
        titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default'
    });

    // Show window when ready to prevent visual flash
    win.once('ready-to-show', () => {
        win.show();
        if (isDevelopment) {
            win.webContents.openDevTools();
        }
    });

    // Load the HTML file
    win.loadFile(path.join(__dirname, 'index.html')).catch(err => {
        console.error('Failed to load index.html:', err);
    });

    // Handle window closed
    win.on('closed', () => {
        // Dereference the window object
    });

    return win;
}

app.whenReady().then(async () => {
    // Set up Content Security Policy
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': [
                    isDevelopment
                        ? "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:;"
                        : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;"
                ]
            }
        });
    });

    // Set up IPC handlers
    ipcMain.handle('get-app-version', () => {
        return app.getVersion();
    });

    // Create application menu
    const menu = Menu.buildFromTemplate([
        {
            label: app.getName(),
            submenu: [
                {
                    label: 'About ' + app.getName(),
                    role: 'about'
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'close' }
            ]
        }
    ]);
    
    Menu.setApplicationMenu(menu);

    // Create the main window
    const mainWindow = createWindow();

    // Watch for bundle changes in development for hot reload
    if (isDevelopment) {
        const bundlePath = path.join(__dirname, '..', 'dist', 'renderer.bundle.js');
        
        if (chokidar && fs.existsSync(path.dirname(bundlePath))) {
            // Use chokidar for better file watching
            const watcher = chokidar.watch(bundlePath, {
                ignoreInitial: true,
                awaitWriteFinish: {
                    stabilityThreshold: 100,
                    pollInterval: 100
                }
            });
            
            watcher.on('change', () => {
                console.log('Bundle changed, reloading renderer...');
                // Small delay to ensure file is fully written
                setTimeout(() => {
                    BrowserWindow.getAllWindows().forEach(win => {
                        win.webContents.reload();
                    });
                }, 100);
            });
        } else if (fs.existsSync(bundlePath)) {
            // Fallback to fs.watchFile
            fs.watchFile(bundlePath, (curr, prev) => {
                console.log('Bundle changed, reloading renderer...');
                BrowserWindow.getAllWindows().forEach(win => {
                    win.webContents.reload();
                });
            });
        }
    }

    // Handle app activation (macOS)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
}).catch(err => {
    console.error('Failed to initialize app:', err);
});

// Handle all windows closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, navigationUrl) => {
        event.preventDefault();
        console.log('Blocked new window creation to:', navigationUrl);
    });
});