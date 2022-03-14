// electron/electron.js
const { app } = require('electron');
const {AppStart} =require("./AppStart")
const {AppMenu}=require("./AppMenu")
const isDev = process.env.IS_DEV == "true" ? true : false;
const shouldQuit = app.requestSingleInstanceLock() //单实例
const appStart=new AppStart()
const appMenu=new AppMenu()
/*在开发模式下，应父进程（parent process）的要求完全退出。 */
if (isDev) {
  if (process.platform === "win32") {
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
      appStart.winRestoreFocus(win)
  })
  /*事件：ready 当 Electron 完成初始化时，发出一次*/
  app.on("ready", () => {
      // protocolUtil.interceptFile()
      // appStart.installDevtools()
      createWindow()
      appMenu.initMenu(win)
      // ipcMain.register(win)
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
/*activate: macOS 当应用被激活时发出。*/
app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // if (BrowserWindow.getAllWindows().length === 0) createWindow()
  if (win == null) {
      createWindow()
  }
})


function createWindow() {
  win=appStart.initWindow()
  appStart.initWinLoad(win)
}