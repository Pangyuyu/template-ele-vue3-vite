/*此处是IPC通信示例，示例来自：
  https://www.electronjs.org/zh/docs/latest/tutorial/ipc
*/
const { Log } = require("../logUtil")
const log = new Log()
const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

/**
 * 打开文件选择框
 * @returns 返回所选文件的路径
 */
async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    log.d("handleFileOpen",filePaths)
    if (canceled) {
        return
    } else {
        return filePaths[0]
    }
}

module.exports.ToolIpcExample = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.on("ipc-example-set-title", (event, args) => {
            mainWin.setTitle(args.title)
        })
        ipcMain.handle('ipc-example-file-choose', handleFileOpen)
    }
}