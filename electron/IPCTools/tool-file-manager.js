/*文件管理操作*/
const { Log } = require("../logUtil")
const log = new Log()
module.exports.ToolFileManager = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.handle('file-manager-choose-read', (event, args) => {

        })
    }
    this.unRegister = function (ipcMain) {
        ipcMain.removeHandler('file-manager-choose-read')
    }
}