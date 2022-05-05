const ipcMain=require("electron").ipcMain //IPC通信主进程实例
// import { ipcMain } from "electron"
// import ToolOpenChildwin from "./tool-open-childwin"
const {ToolOpenChildwin}=require("./tool-open-childwin")

const toolOpenChildWin=new ToolOpenChildwin()
module.exports.IpcEntrance=function(){
    this.mainWin=null;
    this.register=function(mainWin){
        this.mainWin=mainWin
        toolOpenChildWin.registerOn(ipcMain,this.mainWin)
    }
}