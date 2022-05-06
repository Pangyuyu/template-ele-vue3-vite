const ipcMain=require("electron").ipcMain //IPC通信主进程实例
const {ToolOpenChildwin}=require("./tool-open-childwin")
const {ToolIpcExample} = require('./tool-ipc-example')
const toolOpenChildWin=new ToolOpenChildwin()
const toolIpcExample=new ToolIpcExample()
module.exports.IpcEntrance=function(){
    this.mainWin=null;
    this.register=function(mainWin){
        this.mainWin=mainWin
        toolOpenChildWin.registerOn(ipcMain,this.mainWin)
        toolIpcExample.registerOn(ipcMain,this.mainWin)
    }
}