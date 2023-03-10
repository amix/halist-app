const { app, BrowserWindow, Tray, shell, ipcMain } = require('electron')
const path = require('path')

// --- Window managment
let mainWindow
const createWindow = () => {
    const win = new BrowserWindow({
        title: "Halist AI",
        width: 575,
        height: 750,
        minWidth: 400,
        minHeight: 500,
        frame: false,
        backgroundColor: '#202020',
        icon: __dirname + 'icon.png',
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    mainWindow = win
    win.loadFile('src/index.html')
    return win
}

const ensureHasWindow = () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
    const activeWindow = mainWindow.browserWindow
    if (activeWindow) {
        showWindow(activeWindow)
    }
}

const showWindow = (window) => {
    window.show()
    if (window.isMinimized()) {
        window.restore()
    }
}

// --- App Listners
app.whenReady().then(() => {
    createWindow()

    app.on('activate', ensureHasWindow)
    app.on('did-become-active', ensureHasWindow)

    ipcMain.on('open-link', (event, arg) => {
        event.returnValue = 'ok'
        if (arg.indexOf("https://halist.ai/login") != -1) {
            arg = 'https://halist.ai/login?from_electron=true'
        }
        if (arg.indexOf("https://amix3k.loca.lt/login") != -1) {
            arg = 'https://amix3k.loca.lt/login?from_electron=true'
        }
        shell.openExternal(arg)
    })
})

app.setAsDefaultProtocolClient("halist")

app.on('open-url', (event, urlRaw) => {
    if (urlRaw.indexOf("/logged_in") != -1) {
        const token = urlRaw.match(/token=([^\s&]+)/)[1]
        mainWindow.webContents.send('login-success', {token})
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// --- Auto updater
require('update-electron-app')({
  repo: 'amix/halist-for-desktop',
  updateInterval: '5 minute',
  logger: require('electron-log')
})
