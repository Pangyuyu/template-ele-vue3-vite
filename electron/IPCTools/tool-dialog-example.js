const { Log } = require("../logUtil")
const { dialog } = require('electron')
const log = new Log()
module.exports.ToolDialogExample = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.handle('show-open-dialog-sync', (event, args) => {
            log.d("show-open-dialog-sync", args)
            return dialog.showOpenDialogSync(mainWin,
                {
                    ...args
                })
        })
        ipcMain.handle('show-save-dialog-sync', (event, args) => {

        })
        ipcMain.handle('show-message-box-sync', (event, args) => {

        })
        ipcMain.on('show-error-box', (event, args) => {

        })
    }
}