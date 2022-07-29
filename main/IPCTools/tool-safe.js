const { safeStorage } = require("electron")
const { NewOK } = require("../utils/error")
const { Log } = require("../utils/log")
const log = new Log().withTag("tool-safe")
module.exports.ToolSafe=function(){
    this.registerOn=function(ipcMain,mainWin){
        ipcMain.handle("app-safe-encrypt",(event,args)=>{
            const plainText=args.plainText
            if(!safeStorage.isEncryptionAvailable){
                return plainText
            }
            log.d("原始数据:",plainText)
            const encryptBuffer=safeStorage.encryptString(plainText)
            const data=encryptBuffer.toString("base64")
            log.d("加密结果:",data)
            return NewOK(data)
        })
        ipcMain.handle("app-safe-decrypt",(event,args)=>{
            const encrypted=args.encrypted            
            if(!safeStorage.isEncryptionAvailable){
                return args.encrypted
            }
            log.d("密文:",encrypted)
            const decryptStr=safeStorage.decryptString(Buffer.from(encrypted, 'base64'))
            log.d("解密:",decryptStr)
            return NewOK(decryptStr)
        })
    }
    this.unRegister = function (ipcMain) {
        ipcMain.removeHandler("app-safe-encrypt")
        ipcMain.removeHandler("app-safe-decrypt")
    }
}