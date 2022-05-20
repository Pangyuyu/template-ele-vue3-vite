const { Log } = require("../logUtil")
const { dialog } = require('electron')
const log = new Log()
module.exports.ToolDialogExample = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.handle('show-open-dialog-sync', (event, args) => {
            return dialog.showOpenDialogSync(mainWin,
                {
                    ...args
                })
        })
        ipcMain.handle('show-save-dialog-sync', (event, args) => {
            return dialog.showSaveDialogSync(mainWin,
                {
                    ...args
                })
        })
        ipcMain.handle('show-message-box-sync', (event, args) => {
            return dialog.showMessageBoxSync(mainWin,
                {
                    ...args
                })
        })
        ipcMain.handle('show-error-box', (event, args) => {
            return dialog.showErrorBox(args.title,args.content)
        })
    }
}