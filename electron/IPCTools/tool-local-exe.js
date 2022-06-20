
/*参考文档：
1.Node.js v18.4.0 文档 child_process
    http://nodejs.cn/api/child_process.html
2.nodejs启动其他程序的封装
    https://blog.csdn.net/foren_whb/article/details/109533750
3.cprocess.execFile 回调不走
    真正的原因是 child_process.exec 的 timeout 默认是 0，这样回调永远不会走。
*/
const { Log } = require("../logUtil")
const cprocess = require('child_process');
const path = require('path');
const log = new Log()
//打开记事本示例
function openNotepad() {
    cprocess.execFile("C:\\windows\\notepad.exe", null, null, (error, stdout, stderr) => {
        if (error) {
            log.e("打开EXE失败", filePath, error)
            resolve({
                code: -1,
                message: error.message
            })
            return
        }
        log.d(filePath, "stdout", stdout)
        log.d(filePath, "stderr", stderr)
        resolve({
            code: 0,
            message: "OK"
        })
    })
}
function exeStart(filePath) {
    return new Promise((resolve, __) => {
        cprocess.exec(".\\local_api.exe",
            {
                cwd: filePath,
                windowsHide: false,
            }, (error, stdout, stderr) => {
                if (error) {
                    log.e("打开EXE失败", filePath, error)
                    resolve({
                        code: -1,
                        message: error.message
                    })
                    return
                }
                log.d(filePath, "stdout", stdout)
                log.d(filePath, "stderr", stderr)
                resolve({
                    code: 0,
                    message: "OK"
                })
            })
    })
}
function exeStop(exeName) {
    return new Promise((resolve, __) => {
        let cmd = process.platform === 'win32' ? 'tasklist /v' : 'ps aux'
        cprocess.exec(cmd, (err, stdout, stderr) => {
            if (err) {
                resolve({
                    code: -1,
                    message: err.message
                })
                return
            }
            let message=`本地服务未启动!`
            stdout.split('\n').filter((line) => {
                console.debug(line)
                if (line.indexOf(exeName) > -1) {
                    let processMessage = line.trim().split(/\s+/)
                    let processId = processMessage[1]
                    try {
                        process.kill(processId)
                        message=`${exeName}已关闭！`
                        console.log(exeName + '已关闭！')
                    } catch (err) {
                        message=`${exeName}${err.message}`
                    }
                }
            })
            resolve({
                code:0,
                message:""
            })
        })
    })
}
module.exports.ToolLocalExe = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.handle('local-exe-start', async (event, args) => {
            log.d("local-exe-start")
            if (process.platform != 'win32' && process.arch != 'ia32') {
                return {
                    code: -1,
                    message: "此功能只支持windows 64 位系统!"
                }
            }
            const exePath = path.resolve(".", "resources", "exe", "bin")
            log.d("exePath", exePath)
            const startRes = await exeStart(exePath)
            return startRes
        })
        ipcMain.handle('local-exe-stop', async (event, args) => {
            log.d("local-exe-stop")
            const stopRes= await exeStop("local_api.exe")
            return stopRes
        })
    }
    this.unRegister = function (ipcMain) {
        ipcMain.removeHandler('local-exe-start')
        ipcMain.removeHandler('local-exe-stop')
    }
}