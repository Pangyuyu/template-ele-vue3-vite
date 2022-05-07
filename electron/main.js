// electron/electron.js
const { app,Tray,Menu,nativeImage } = require('electron');
const { AppStart } = require("./AppStart")
const { AppMenu } = require("./AppMenu")
const { IpcEntrance } = require("./IPCTools/IpcEntrance")
const path=require('path')
const isDev = process.env.IS_DEV == "true" ? true : false;
const shouldQuit = app.requestSingleInstanceLock() //单实例
const appStart = new AppStart()
const appMenu = new AppMenu()
const ipcTools = new IpcEntrance()
let mainWin = null //窗口
/*在开发模式下，应父进程（parent process）的要求完全退出。 */

if (isDev) {
  if (process.platform === "win32") {
    process.throwDeprecation = true  //用于控制是否将弃用警告作为异常抛出。将此设置为true会引发弃用错误。使用此属性代替
    process.traceDeprecation = true //用于控制是否打印弃警告的堆栈跟踪到stderr。将此设置为true将打印废弃警告的堆栈跟踪
    process.traceProcessWarnings = true //用于控制是否打印进程警告及其堆栈跟踪到stderr。将此设置为true将会为进程警告（包括弃用）打印堆栈跟踪
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit()
      }
    })
  } else {
    process.on("SIGTERM", () => {
      app.quit()
    })
  }
}

/*判断是否已经有一个实例（窗体），若有则直接把刚启动的退出。*/
if (!shouldQuit) {
  app.quit()
} else {
  /*事件：second-instance 监听第二个实例是否已启动*/
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    appStart.winRestoreFocus(mainWin)
  })
  //只有ready之后才可以初始化窗体
  app.whenReady().then(() => {
    createWindow()
    /*activate: macOS 当应用被激活时发出。*/
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })
}
/*window-all-closed:当所有窗体关闭时，退出应用*/
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})



function createWindow() {
  app.setAppUserModelId("Electron示例")
  mainWin = appStart.initWindow()
  appStart.initWinLoad(mainWin)
  appMenu.initMenu(mainWin)
  ipcTools.register(mainWin)
  createTray()
}

let tray
function createTray() {
  const iconPath=path.join(__dirname,"assets",'logo.png')
  console.debug("iconPath",iconPath)
  const icon = nativeImage.createFromPath(iconPath)
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Electron示例')
  tray.setTitle('胖鱼')
}