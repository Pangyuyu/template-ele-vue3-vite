const ipcMain = require("electron").ipcMain //IPC通信主进程实例
const { ToolOpenChildwin } = require("./tool-open-childwin")
const { ToolIpcExample } = require('./tool-ipc-example')
const { ToolSerialPort } = require('./tool-serial-port')
const { ToolDllExample } = require('./tool-dll-example')
const { ToolSystemInfo } = require('./tool-system-info')
const { ToolWindowExample } = require('./tool-window-example')
const { ToolApiPathExample } = require('./tool-api-path-example')
const { ToolDialogExample } = require('./tool-dialog-example')
const toolOpenChildWin = new ToolOpenChildwin()
const toolIpcExample = new ToolIpcExample()
const toolSerialPort = new ToolSerialPort()
const toolDllExample = new ToolDllExample()
const toolSystemInfo = new ToolSystemInfo()
const toolWindowExample = new ToolWindowExample()
const toolApiPathExample = new ToolApiPathExample()
const toolDialogExample = new ToolDialogExample()
module.exports.IpcEntrance = function () {
    this.mainWin = null;
    this.removeAll=function(){
        //清理可能存在的事件，因为托盘可能会二次打开窗体
        ipcMain.removeAllListeners()
        ipcMain.removeHandler('ipc-example-file-choose')
        ipcMain.removeHandler('ipc-example-theme-change')
        ipcMain.removeHandler('dll-method')
        ipcMain.removeHandler("tool-system-info")
        ipcMain.removeHandler("tool-api-path")
        ipcMain.removeHandler("show-open-dialog-sync")
        ipcMain.removeHandler("show-save-dialog-sync")
        ipcMain.removeHandler("show-message-box-sync")
        ipcMain.removeHandler("show-error-box")
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
    }
}