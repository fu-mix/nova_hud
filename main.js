const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    transparent: true,        // ← ここが透過の鍵
    frame: false,             // ウィンドウ枠なし
    alwaysOnTop: true,        // 最前面表示
    hasShadow: false,
  })
  win.loadFile('nova_hud.html')
}

app.whenReady().then(createWindow)