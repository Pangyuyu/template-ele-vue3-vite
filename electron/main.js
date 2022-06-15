// electron/electron.js
const { Log } = require("./logUtil")
const log = new Log()
const { app, Tray, Menu, nativeImage, dialog } = require('electron');
const { AppStart } = require("./AppStart")
const { AppMenu } = require("./AppMenu")
const { IpcEntrance } = require("./IPCTools/IpcEntrance")
const path = require('path')
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
    log.d("====second-instance===")
    appStart.winRestoreFocus(mainWin)
  })
  //只有ready之后才可以初始化窗体
  app.commandLine.appendSwitch('enable-experimental-web-platform-features')
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

app.on('will-finish-launching', () => {
  log.d("====will-finish-launching===")
})
app.on("window-all-closed", () => {
  log.d("====window-all-closed===")
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on('before-quit', (event) => {
  event.preventDefault()
  const nativeImage = require('electron').nativeImage
  dialog.showMessageBox({
    title: "提醒",
    type: 'question',
    buttons: ["确定", "取消"],
    defaultId: 1,
    detail: '您确定要退出应用吗?',
    noLink: true,
    icon: nativeImage.createFromPath("./resources/icons/logo.png")
  }).then(result => {
    if (result.response == 0) {
      app.exit(0)
    }
  }).catch(err => [
    log.e(err)
  ])
})

function createWindow() {
  //如果窗体没有被销毁
  if (mainWin&&!mainWin.isDestroyed()) {
    mainWin.showInactive()
  } else {
    app.setAppUserModelId("Electron示例")
    mainWin = appStart.initWindow()
    appStart.initWinLoad(mainWin)
    appMenu.initMenu(mainWin)
    ipcTools.register(mainWin)
    createTray()
    mainWin.setIcon(nativeImage.createFromPath("./resources/icons/logo.png"))
  }
}

let tray
function createTray() {
  //托盘在没有窗体的时候是可以存在的。为了不多次创建托盘
  if(tray&&!tray.isDestroyed()){
    return
  }
  //TODO Linux下打包图标显示不出来
  const iconPath = path.join(process.cwd(), "resources", 'images', 'logo.png')
  // console.debug("iconPath", iconPath)
  const icon = nativeImage.createFromPath(iconPath)
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '重新打开',
      type: "normal",
      click: () => {
        createWindow()
      }
    },
    { type: "separator" },
    {
      label: '彻底退出',
      type: 'normal',
      click: () => {
        if (app) {
          app.exit(0)
        }
      }
    },
  ])
  tray.setContextMenu(contextMenu)
  tray.setToolTip('Electron示例')
  tray.setTitle('胖鱼')
}