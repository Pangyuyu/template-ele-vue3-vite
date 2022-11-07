const ipcMain = require("electron").ipcMain //IPC通信主进程实例
const toolOpenChildWin = require("./tool-open-childwin")
const toolIpcExample = require('./tool-ipc-example')
const toolSerialPort = require('./tool-serial-port')
// const { ToolDllExample } = require('./tool-dll-example')
const toolSystemInfo = require('./tool-system-info')
const toolWindowExample = require('./tool-window-example')
const toolApiPathExample = require('./tool-api-path-example')
const toolDialogExample = require('./tool-dialog-example')
const toolFileManager= require('./tool-file-manager')
const toolPcBle=require('./tool-pc-ble')
const toolLocalServer=require("./tool-local-server")
const toolSafe =require("./tool-safe")
module.exports.IpcEntrance = function () {
    this.mainWin = null;
    this.removeAll=function(){
        //清理可能存在的事件，因为托盘可能会二次打开窗体
        ipcMain.removeAllListeners()
        toolOpenChildWin.unRegister(ipcMain)
        toolIpcExample.unRegister(ipcMain)
        toolSerialPort.unRegister(ipcMain)
        // toolDllExample.unRegister(ipcMain)
        toolSystemInfo.unRegister(ipcMain)
        toolWindowExample.unRegister(ipcMain)
        toolApiPathExample.unRegister(ipcMain)
        toolDialogExample.unRegister(ipcMain)
        toolFileManager.unRegister(ipcMain)
        toolPcBle.unRegister(ipcMain)
        toolLocalServer.unRegister(ipcMain)
        toolSafe.unRegister(ipcMain)
    },
    this.register = function (mainWin) {
        this.mainWin = mainWin
        this.removeAll()
        toolOpenChildWin.registerOn(ipcMain, this.mainWin)
        toolIpcExample.registerOn(ipcMain, this.mainWin)
        toolSerialPort.registerOn(ipcMain, this.mainWin)
        // toolDllExample.registerOn(ipcMain, this.mainWin)
        toolSystemInfo.registerOn(ipcMain, this.mainWin)
        toolWindowExample.registerOn(ipcMain, this.mainWin)
        toolApiPathExample.registerOn(ipcMain, this.mainWin)
        toolDialogExample.registerOn(ipcMain,this.mainWin)
        toolFileManager.registerOn(ipcMain,this.mainWin)
        toolPcBle.registerOn(ipcMain,this.mainWin)
        toolLocalServer.registerOn(ipcMain,this.mainWin)
        toolSafe.registerOn(ipcMain,this.mainWin)
    }
}