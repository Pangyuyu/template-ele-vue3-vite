const ipcMain = require("electron").ipcMain //IPC通信主进程实例
const { ToolOpenChildwin } = require("./tool-open-childwin")
const { ToolIpcExample } = require('./tool-ipc-example')
const { ToolSerialPort } = require('./tool-serial-port')
const { ToolDllExample } = require('./tool-dll-example')
const { ToolSystemInfo } = require('./tool-system-info')
const { ToolWindowExample } = require('./tool-window-example')
const { ToolApiPathExample } = require('./tool-api-path-example')
const { ToolDialogExample } = require('./tool-dialog-example')
const {ToolFileManager}= require('./tool-file-manager')
const {ToolPcBle}=require('./tool-pc-ble')
const toolOpenChildWin = new ToolOpenChildwin()
const toolIpcExample = new ToolIpcExample()
const toolSerialPort = new ToolSerialPort()
const toolDllExample = new ToolDllExample()
const toolSystemInfo = new ToolSystemInfo()
const toolWindowExample = new ToolWindowExample()
const toolApiPathExample = new ToolApiPathExample()
const toolDialogExample = new ToolDialogExample()
const toolFileManager=new ToolFileManager()
const toolPcBle =new ToolPcBle()
module.exports.IpcEntrance = function () {
    this.mainWin = null;
    this.removeAll=function(){
        //清理可能存在的事件，因为托盘可能会二次打开窗体
        ipcMain.removeAllListeners()
        toolOpenChildWin.unRegister(ipcMain)
        toolIpcExample.unRegister(ipcMain)
        toolSerialPort.unRegister(ipcMain)
        toolDllExample.unRegister(ipcMain)
        toolSystemInfo.unRegister(ipcMain)
        toolWindowExample.unRegister(ipcMain)
        toolApiPathExample.unRegister(ipcMain)
        toolDialogExample.unRegister(ipcMain)
        toolFileManager.unRegister(ipcMain)
        toolPcBle.unRegister(ipcMain)
    },
    this.register = function (mainWin) {
        this.mainWin = mainWin
        this.removeAll()
        toolOpenChildWin.registerOn(ipcMain, this.mainWin)
        toolIpcExample.registerOn(ipcMain, this.mainWin)
        toolSerialPort.registerOn(ipcMain, this.mainWin)
        toolDllExample.registerOn(ipcMain, this.mainWin)
        toolSystemInfo.registerOn(ipcMain, this.mainWin)
        toolWindowExample.registerOn(ipcMain, this.mainWin)
        toolApiPathExample.registerOn(ipcMain, this.mainWin)
        toolDialogExample.registerOn(ipcMain,this.mainWin)
        toolFileManager.registerOn(ipcMain,this.mainWin)
        toolPcBle.registerOn(ipcMain,this.mainWin)
    }
}