
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
const net = require('net');
const log = new Log()
let LOCALAPI_PID = -1 //本地服务子进程
const { resolve } = require("path");
const apiFileName = "yu-local-api"
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
function exeStart(filePath, fileName,port) {
    return new Promise(async (resolve, __) => {
        if (LOCALAPI_PID > -1) {
            resolve({
                code: 1,
                message: "服务已启动,请勿重复启动!"
            })
            return
        }
        cprocess.exec(`.\\${fileName} -p ${port}`,
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
                resolve({
                    code: 0,
                    message: "OK"
                })
            })
    })
}
/**
 * 延迟检测服务是否启动成功
 */
function delayCheckStart(taskName) {
    return new Promise((resolve,__)=>{
        setTimeout(async () => {
            const findRes = await findTaskPidByName(taskName)
            const isSuccess=findRes.code == 0
            resolve({
                code:isSuccess?0:1,
                message:isSuccess?"服务启动失败!" : "服务启动成功!"
            })
        }, 2000)
    })
}
/**
 * 根据名称返回进程PID
 * 因为这个有点耗时了,所以要这样写
 */
function findTaskPidByName(taskName) {
    return new Promise((resolve, __) => {
        if (taskName == undefined || taskName == null || taskName.length == 0) {
            resolve({
                code: -1,
                message: "进程名称不可为空!"
            })
            return
        }
        // let cmd = process.platform === 'win32' ? 'tasklist /fi "STATUS eq running"' : 'ps aux'
        //使用tasklist /fi 筛选速度快,
        let cmd = process.platform === 'win32' ? `tasklist /fi "IMAGENAME eq ${taskName}"` : 'ps aux'
        cprocess.exec(cmd, (err, stdout, stderr) => {
            if (err) {
                resolve({
                    code: -1,
                    message: err.message
                })
                return
            }
            let targetPid = -1
            let message = ""
            stdout.split('\n').filter((line) => {
                let processMessage = line.trim().split(/\s+/)
                log.d(processMessage[0], processMessage[1])
                if (line.indexOf(taskName) > -1) {
                    targetPid = processMessage[1]
                }
            })
            resolve({
                code: targetPid > -1 ? 0 : 1,
                message: message,
                data: {
                    pid: targetPid
                }
            })
        })

    })
}
/**
 * 通用方法
 * @param {string} exeName 
 * @returns 
 */
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
            let message = `本地服务未启动!`
            stdout.split('\n').filter((line) => {
                // console.debug(line)
                if (line.indexOf(exeName) > -1) {
                    let processMessage = line.trim().split(/\s+/)
                    let processId = processMessage[1]
                    try {
                        process.kill(processId)
                        message = `${exeName}已关闭！`
                        console.log(exeName + '已关闭！')
                    } catch (err) {
                        message = `${exeName}${err.message}`
                    }
                }
            })
            resolve({
                code: 0,
                message: ""
            })
        })
    })
}
/**
 * 发现可用端口号
 */
function checkPortUsed(port){
    return new Promise((resolve,_)=>{
        let server = net.createServer().listen(port);
        server.on('listening',function(){
            server.close();
            resolve({
                code:0
            });
        });
        server.on('error',function(err){
            if(err.code == 'EADDRINUSE'){
                resolve({
                    code:1
                });
            }
        });
    })
}
module.exports.ToolLocalServer = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.handle('local-exe-start', async (event, args) => {
            log.d("local-exe-start",args)
            const port=args.port
            if (process.platform != 'win32' && process.arch != 'ia32') {
                return {
                    code: 1,
                    message: "此功能只支持windows 64 位系统!"
                }
            }
            const exeName = `${apiFileName}.exe`
            const findRes = await findTaskPidByName(exeName)
            if (findRes.code == 0) {
                return {
                    code: 1,
                    message: `本地服务已启动，请勿重复启动!`
                }
            }
            const exePath = path.resolve(".", "resources", "server", "win_64")
            log.d("exePath", exePath)
            exeStart(exePath, exeName,port)
            const checkRes=await delayCheckStart()
            if (checkRes.code != 0) {
                return checkRes
            }
            return {
                code: 0,
                message: "服务已启动!"
            }
        })
        ipcMain.handle('local-exe-stop', async (event, args) => {
            log.d("local-exe-stop")
            const findRes = await findTaskPidByName(`${apiFileName}.exe`)
            if (findRes.code == 0) {
                try {
                    const exePid = findRes.data.pid
                    process.kill(exePid)
                } catch (ex) {
                    log.e("local-exe-stop", ex)
                }
            }
            return {
                code: 0,
                message: "本地服务已停止!"
            }
        })
        ipcMain.handle('local-exe-check',async (event,args)=>{
            const findRes = await findTaskPidByName(`${apiFileName}.exe`)
            return findRes
        })
        ipcMain.handle('local-find-available-port',async (event,args)=>{
            var port=-1
            for(var i=5001;i<65535;i++){
                const findRes=await checkPortUsed(i)
                if(findRes.code==0){
                    port=i
                    break
                }
            }
            
            return {
                code:port>=-1?0:1,
                message:port==-1?"未找到可用端口":"OK",
                data:{
                    port:port
                }
            }
        })
    }
    this.stopChildProcess = function () {
        return new Promise(async (resolve, __) => {
            log.d("正在执行停止子进程服务")
            const findRes = await findTaskPidByName(`${apiFileName}.exe`)
            if (findRes.code == 0) {
                try {
                    const exePid = findRes.data.pid
                    process.kill(exePid)
                } catch (ex) {
                    log.e("local-exe-stop", ex)
                }
            }
            resolve({})
        })
    }
    
    this.unRegister = function (ipcMain) {
        ipcMain.removeHandler('local-exe-start')
        ipcMain.removeHandler('local-exe-stop')
    }
}