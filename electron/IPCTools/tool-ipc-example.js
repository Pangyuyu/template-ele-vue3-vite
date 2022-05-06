/*此处是IPC通信示例，示例来自：
  https://www.electronjs.org/zh/docs/latest/tutorial/ipc
*/
const { Log } = require("../logUtil")
const log = new Log()
const { BrowserWindow } = require('electron')

module.exports.ToolIpcExample=function(){
    this.registerOn=function(ipcMain,mainWin){
        ipcMain.on("ipc-example-set-title",(event,args)=>{
            mainWin.setTitle(args.title)
        })
    }
}