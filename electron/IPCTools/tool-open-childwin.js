const { Log } = require("../logUtil")
const log = new Log()
const { BrowserWindow } = require('electron')

module.exports.ToolOpenChildwin = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.on("openChildWin", (event, args) => {
            const isModal=true
            if(args.isModal!=undefined&&args.isModal!=null){
                isModal=args.isModal
            }
            /*窗口参数参考：https://www.electronjs.org/zh/docs/latest/api/browser-window*/
            const winOptions = {
                width: 1280,
                height: 768,
                useContentSize:false,//width 和 height 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 false
                center:true,//窗口是否在屏幕居中.
                parent: mainWin,//父窗体设置为主窗体
                modal: isModal,//是否是模态框
                opacity:0.9,//设置窗口初始的不透明度, 介于 0.0 (完全透明) 和 1.0 (完全不透明) 之间。 目前仅支持Windows 和 macos
                allowRunningInsecureContent:true,//允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins
                safeDialogs:true,//是否启用浏览器样式的持续对话框保护。 默认值为 false.
                spellcheck:false,//是否启用内置拼写检查器。 默认值为 true。
            }
            const win = new BrowserWindow(winOptions)
            win.loadURL(args.url)
            win.title = args.title
            win.show()
        })
    }
}