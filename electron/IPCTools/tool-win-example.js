/*获取窗体或操作系统基本信息*/
const { Log } = require("../logUtil")
const log = new Log()
module.exports.ToolSysWinExample=function(){
    this.registerOn=function(ipcMain,mainWin){
        ipcMain.handle('tool-get-syswin',(event,args)=>{
            log.d("process.resourcesPath",process.resourcesPath)
            let attrList=[
                {
                    name:"process.resourcesPath",
                    value:process.resourcesPath
                },
                {
                    name:"process.versions.chrome",
                    value:process.versions.chrome
                },
                {
                    name:"process.versions.electron",
                    value:process.versions.electron
                },
                {
                    name:"process.getSystemVersion()",
                    value:process.getSystemVersion()
                },
                {
                    name:"process.platform",
                    value:process.platform
                },
                {
                    name:"process.arch",
                    value:process.arch
                }
            ]
            return attrList
        })
    }
}