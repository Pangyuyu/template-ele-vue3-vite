/*获取窗体或操作系统基本信息*/
const os = require('os');
const { Log } = require("../utils/log")
const log = new Log().withTag("tool-system-info")
module.exports.ToolSystemInfo=function(){
    this.registerOn=function(ipcMain,mainWin){
        ipcMain.handle('tool-system-info',(event,args)=>{
            let userInfoStr=""
            try{
                const userInfo=os.userInfo()
                userInfoStr=JSON.stringify(os.userInfo())
            }catch(ex){
                log.e("os.userInfo()失败")
            }
           
            let attrList=[
                {
                    name:"process.resourcesPath",
                    desc: 'resources 目录的路径',
                    value:process.resourcesPath
                },
                {
                    name:"process.versions.chrome",
                    desc: 'Chrome 版本号',
                    value:process.versions.chrome
                },
                {
                    name:"process.versions.electron",
                    desc: 'Electron 版本号',
                    value:process.versions.electron
                },
                {
                    name:"process.getSystemVersion()",
                    value:process.getSystemVersion()
                },
                {
                    name:"process.platform",
                    desc: '操作系统(Electron)',
                    value:process.platform
                },
                {
                    name:"process.arch()",
                    desc: '操作系统位数(Electron)',
                    value:process.arch
                },
                {
                    name:"os.arch()",
                    desc: 'CPU 架构',
                    value:os.arch()
                },
                {
                    name:"os.endianness()",
                    desc: 'CPU 字节序',
                    value:os.endianness()
                },
                {
                    name:"os.homedir()",
                    desc: '用户的主目录',
                    value:os.homedir()
                },
                {
                    name:"os.hostname()",
                    desc: '操作系统的主机名',
                    value:os.hostname()
                },
                {
                    name:"os.platform()",
                    desc:"操作系统平台",
                    value:os.platform()
                },
                {
                    name:"os.tmpdir()",
                    desc:"临时文件目录",
                    value:os.tmpdir()
                },
                {
                    name:"os.type()",
                    desc:"操作系统名称",
                    value:os.type()
                },
                {
                    name:"os.version()",
                    desc:"内核版本",
                    value:os.version()
                },
                {
                    name:"os.userInfo()",
                    desc:"用户信息",
                    value:userInfoStr
                }
            ]
            return attrList
        })
    }
    this.unRegister = function (ipcMain) {
        ipcMain.removeHandler('tool-system-info')
    }
}