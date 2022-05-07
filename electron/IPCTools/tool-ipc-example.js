/*此处是IPC通信示例，示例来自：
  https://www.electronjs.org/zh/docs/latest/tutorial/ipc
*/
const { Log } = require("../logUtil")
const log = new Log()
const { dialog,nativeTheme } = require('electron')
// const path = require('path')

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

async function handleThemeChange(event,args){
    if(args.themeName=='theme-sys'){
        nativeTheme.themeSource = 'system'
    }else if(args.themeName=='theme-dark'){
        nativeTheme.themeSource = 'dark'
    }else if(args.themeName=='theme-light'){
        nativeTheme.themeSource = 'light'
    }    
    return nativeTheme.shouldUseDarkColors?'dark':'light'
}

module.exports.ToolIpcExample = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.on("ipc-example-set-title", (event, args) => {
            mainWin.setTitle(args.title)
        })
        ipcMain.handle('ipc-example-file-choose', handleFileOpen)
        ipcMain.handle('ipc-example-theme-change',handleThemeChange)
    }
}