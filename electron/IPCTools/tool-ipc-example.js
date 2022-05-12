/*此处是IPC通信示例，示例来自：
  https://www.electronjs.org/zh/docs/latest/tutorial/ipc
*/
const { Log } = require("../logUtil")
const log = new Log()
const { dialog, nativeTheme } = require('electron')
const path = require('path')

/**
 * 打开文件选择框
 * @returns 返回所选文件的路径
 */
async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    log.d("handleFileOpen", filePaths)
    if (canceled) {
        return
    } else {
        return filePaths[0]
    }
}

async function handleThemeChange(event, args) {
    if (args.themeName == 'theme-sys') {
        nativeTheme.themeSource = 'system'
    } else if (args.themeName == 'theme-dark') {
        nativeTheme.themeSource = 'dark'
    } else if (args.themeName == 'theme-light') {
        nativeTheme.themeSource = 'light'
    }
    return nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
}
const INCREMENT = 0.05
const INTERVAL_DELAY = 200 // ms
let c_pro_value = 0
let progressInterval = -1
function handelProgressStart(mainWin) {
    if (progressInterval == -1) {//只有等于-1的时候才执行
        progressInterval = setInterval(() => {
            if (c_pro_value >= 1) {
                c_pro_value = 1
            }
            if(mainWin){
                mainWin.setProgressBar(c_pro_value)
            }            
            c_pro_value = c_pro_value + INCREMENT //每次进5%
            if (c_pro_value >= 1) {
                c_pro_value = 1
                progressInterval == -1
            }
        }, INTERVAL_DELAY)
    }
}
function handelProgressCancel(mainWin) {
    if (progressInterval > -1) {
        clearInterval(progressInterval)
        progressInterval = -1
    }    
    mainWin.setProgressBar(-1)
}
function handelProgressUnkown(mainWin){
    if (progressInterval > -1) {
        clearInterval(progressInterval)
        progressInterval = -1
    }
    mainWin.setProgressBar(2)
}
module.exports.ToolIpcExample = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.on("ipc-example-set-title", (event, args) => {
            mainWin.setTitle(args.title)
        })
        ipcMain.handle('ipc-example-file-choose', handleFileOpen)        
        ipcMain.handle('ipc-example-theme-change', handleThemeChange)
        ipcMain.on('ipc-example-on-drag-start', (event, fileName) => {            
            const dragFilePath=path.join(process.cwd(),'resources','files',fileName);
            const iconName = path.join('resources','images','drag.png');
            log.d("iconName", iconName)
            event.sender.startDrag({
                file: dragFilePath,//这个必须是绝对路径
                icon: iconName,
            })
        })
        ipcMain.on('ipc-example-progress-start', (event, filePath) => { handelProgressStart(mainWin) })
        ipcMain.on('ipc-example-progress-cancel', (event, filePath) => { handelProgressCancel(mainWin) })
        ipcMain.on('ipc-example-progress-unkown', (event, filePath) => { handelProgressUnkown(mainWin) })
    }
}