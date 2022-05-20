/*文件管理操作*/
const { Log } = require("../logUtil")
const { dialog } = require('electron')
const fsPromise = require('fs').promises //使用fs promises方法
const log = new Log()



module.exports.ToolFileManager = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.handle('file-manager-choose-read', async (event, args) => {
            const openRes = await dialog.showOpenDialog(mainWin, {
                title: '请选择文件',//对话框窗口的标题
                defaultPath: './',//对话框的默认展示路径
                buttonLabel: '确定',
                filters: [{ name: '文本文档', extensions: ['txt'] },],
                properties: ['openFile', 'dontAddToRecent'],
                message: '请选择您要打开的文本文档'
            })
            if (openRes.canceled) {
                return {
                    code: -1,
                    message: '取消选择'
                }
            }
            const filePath = openRes.filePaths[0]
            const fileHandle=await fsPromise.open(filePath)
            /*stat()返回的详细说明：https://juejin.cn/post/6955011872298893319*/
            const fileStat=await fileHandle.stat()
            const fileContent=await fileHandle.readFile("utf8")
            await fileHandle.close()
            return {
                code: 0,
                message: '',
                data: {
                    filePath:filePath,
                    fileStat:{
                        size:fileStat.size,//文件有多少个字节
                        atime:fileStat.atime,//文件最近一次被访问的时间戳
                        mtime:fileStat.mtime,//文件最近一次修改的时间戳
                        ctime:fileStat.ctime,//文件最近一次状态变动的时间戳
                        birthtime:fileStat.birthtime,//文件创建的时间戳
                    },
                    fileContent:fileContent,
                }
            }
        })
    }
    this.unRegister = function (ipcMain) {
        ipcMain.removeHandler('file-manager-choose-read')
    }
}