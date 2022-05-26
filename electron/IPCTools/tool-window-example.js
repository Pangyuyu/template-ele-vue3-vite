/*窗体相关操作*/

const { Log } = require("../logUtil")
const log = new Log()
const { BrowserWindow } = require('electron')

module.exports.ToolWindowExample = function () {
    let colorIndex = 0
    let colorList = [
        'hsl(230, 100%, 50%)',
        'rgb(255, 145, 145)',
        '#ff00a3',
        'blueviolet',
        'hsla(200, 20%, 50%, 0.5)',
        'rgba(255, 255, 255, 0.6)'
    ]
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.on('window:change-bgcolor', (event, args) => {
            if (colorIndex >= colorList.length) {
                colorIndex = 0
            }
            const colorStr = colorList[colorIndex]
            colorIndex++
            log.d("colorStr", colorStr)
            const winOptions = {
                width: 420,
                height: 180,
                parent: mainWin,//父子窗口
                useContentSize: false,//width 和 height 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 false
                center: true,//窗口是否在屏幕居中.
                modal: false,//是否是模态框
                opacity: 0.9,//设置窗口初始的不透明度, 介于 0.0 (完全透明) 和 1.0 (完全不透明) 之间。 目前仅支持Windows 和 macos
                allowRunningInsecureContent: true,//允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins
                safeDialogs: true,//是否启用浏览器样式的持续对话框保护。 默认值为 false.
                spellcheck: false,//是否启用内置拼写检查器。 默认值为 true。
                resizable:false,//设置窗口不可调整大小
                hasShadow:true,//窗口是否有阴影
            }
            const win = new BrowserWindow(winOptions)
            win.setTitle("窗体背景色设置示例")
            win.show()
            win.setBackgroundColor(colorStr)
        })
        ipcMain.on('window:open-local-web',async (event,args)=>{
            const winOptions = {
                width: 1024,
                height: 768,
                parent: mainWin,//父子窗口
                useContentSize: false,//width 和 height 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 false
                center: true,//窗口是否在屏幕居中.
                modal: false,//是否是模态框
                opacity: 0.9,//设置窗口初始的不透明度, 介于 0.0 (完全透明) 和 1.0 (完全不透明) 之间。 目前仅支持Windows 和 macos
                allowRunningInsecureContent: true,//允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins
                safeDialogs: true,//是否启用浏览器样式的持续对话框保护。 默认值为 false.
                spellcheck: false,//是否启用内置拼写检查器。 默认值为 true。
                resizable:false,//设置窗口不可调整大小
                hasShadow:true,//窗口是否有阴影
            }
            const win = new BrowserWindow(winOptions)
            win.setTitle("本地网页地址")
            const isDev = process.env.NODE_ENV == 'development' ? true : false;
            if (isDev) {
                const localUrl = "http://localhost:3000/#/winchild"
                await win.loadURL(localUrl)
                win.show()
            } else {
                // const filePath=`file://${path.join(__dirname, '../dist/index.html')}`
                // await chapterWin.loadURL(filePath)
                await win.loadFile('./index.html',{
                    hash:'/winchild'
                })
                win.show()
            }
            win.show()
        })
    }
    this.unRegister = function (ipcMain) {
        
    }
}