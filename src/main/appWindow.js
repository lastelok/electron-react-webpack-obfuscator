const { app, BrowserWindow } = require('electron')
const path = require('path')

// Electron Forge automatically creates these entry points: APP_WINDOW_PRELOAD_WEBPACK_ENTRY, APP_WINDOW_WEBPACK_ENTRY

let appWindow

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow() {
    // Create new window instance
    appWindow = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#202020',
        show: false,
        autoHideMenuBar: true,
        icon: path.resolve('assets/images/appIcon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            nodeIntegrationInWorker: false,
            nodeIntegrationInSubFrames: false,
            preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
            sandbox: false,
        },
    })

    // Load the index.html of the app window.
    appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY)

    // // Open the DevTools.
    // if (process.env.ENVIRONMENT === 'dev') {
    //     mainWindow.webContents.openDevTools()
    // }

    // Show window when its ready to
    appWindow.on('ready-to-show', () => appWindow.show())

    // Close all windows when main window is closed
    appWindow.on('close', () => {
        appWindow = null
        app.quit()
    })

    return appWindow
}
