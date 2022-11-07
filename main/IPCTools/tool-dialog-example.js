const { Log } = require("../utils/log")
const { dialog } = require('electron')
const log = new Log().withTag("tool-dialog-example")
class ToolDialogExample{
    registerOn (ipcMain, mainWin) {
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
    unRegister (ipcMain) {
        ipcMain.removeHandler('show-open-dialog-sync')
        ipcMain.removeHandler('show-save-dialog-sync')
        ipcMain.removeHandler('show-message-box-sync')
        ipcMain.removeHandler('show-error-box')
    }
}
module.exports=new ToolDialogExample() 