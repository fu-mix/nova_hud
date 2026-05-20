const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWin = null

function createWindow() {
  mainWin = new BrowserWindow({
    width: 1600,
    height: 900,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  })

  mainWin.loadFile('nova_hud.html')

  // ESCキーで終了 — app.quit() を使うとレンダラのクリーンアップが安全に走る
  mainWin.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'Escape') {
      app.quit()
    }
  })

  // HUDからの最小化リクエスト
  ipcMain.on('minimize-window', () => {
    if (mainWin && !mainWin.isDestroyed()) mainWin.minimize()
  })

  // HUDからの終了リクエスト（preload経由）
  ipcMain.on('quit-app', () => {
    app.quit()
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})