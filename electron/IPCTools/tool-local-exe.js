const { Log } = require("../logUtil")
const log = new Log()
module.exports.ToolLocalExe = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.handle('local-exe-start', (event, args) => {
            log.d("local-exe-start")
        })
        ipcMain.handle('local-exe-stop', (event, args) => {
            log.d("local-exe-stop")
        })
    },
        this.unRegister = function (ipcMain) {
            ipcMain.removeHandler('local-exe-start')
            ipcMain.removeHandler('local-exe-stop')
        }
}