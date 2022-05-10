const ipcMain=require("electron").ipcMain //IPC通信主进程实例
const {ToolOpenChildwin}=require("./tool-open-childwin")
const {ToolIpcExample} = require('./tool-ipc-example')
const {ToolSerialPort} = require('./tool-serial-port')
const {ToolDllExample} = require('./tool-dll-example')
const {ToolSysWinExample}=require('./tool-win-example')
const toolOpenChildWin=new ToolOpenChildwin()
const toolIpcExample=new ToolIpcExample()
const toolSerialPort=new ToolSerialPort()
const toolDllExample=new ToolDllExample()
const toolSysWinExample=new ToolSysWinExample()
module.exports.IpcEntrance=function(){
    this.mainWin=null;
    this.register=function(mainWin){
        this.mainWin=mainWin
        toolOpenChildWin.registerOn(ipcMain,this.mainWin)
        toolIpcExample.registerOn(ipcMain,this.mainWin)
        toolSerialPort.registerOn(ipcMain,this.mainWin)
        toolDllExample.registerOn(ipcMain,this.mainWin)
        toolSysWinExample.registerOn(ipcMain,this.mainWin)
    }
}