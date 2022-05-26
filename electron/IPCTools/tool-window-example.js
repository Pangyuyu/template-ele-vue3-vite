/*窗体相关操作*/

const { Log } = require("../logUtil")
const log = new Log()
const { BrowserWindow } = require('electron')
const path = require('path');
// let __ChildWins=new Map()
let __modalChildWin = null
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
                useContentSize: true,//width 和 height 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 false
                center: true,//窗口是否在屏幕居中.
                modal: false,//是否是模态框
                opacity: 0.9,//设置窗口初始的不透明度, 介于 0.0 (完全透明) 和 1.0 (完全不透明) 之间。 目前仅支持Windows 和 macos
                allowRunningInsecureContent: true,//允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins
                safeDialogs: true,//是否启用浏览器样式的持续对话框保护。 默认值为 false.
                spellcheck: false,//是否启用内置拼写检查器。 默认值为 true。
                resizable: false,//设置窗口不可调整大小
                hasShadow: true,//窗口是否有阴影
            }
            const win = new BrowserWindow(winOptions)
            win.setTitle("窗体背景色设置示例")
            win.show()
            win.setBackgroundColor(colorStr)
        })
        ipcMain.on('window:open-local-web', async (event, args) => {
            const preLoadPath = path.join(__dirname, '../preload.js')
            const winOptions = {
                width: 724,
                height: 724,
                maximizable: false,
                minimizable: false,
                resizable: false,
                fullscreenable: false,
                parent: mainWin,//父子窗口
                useContentSize: true,//width 和 height 将设置为 web 页面的尺寸(译注: 不包含边框), 这意味着窗口的实际尺寸将包括窗口边框的大小，稍微会大一点。 默认值为 false
                center: true,//窗口是否在屏幕居中.
                modal: true,//是否是模态框
                opacity: 0.9,//设置窗口初始的不透明度, 介于 0.0 (完全透明) 和 1.0 (完全不透明) 之间。 目前仅支持Windows 和 macos
                allowRunningInsecureContent: true,//允许一个 https 页面运行来自http url的JavaScript, CSS 或 plugins
                safeDialogs: true,//是否启用浏览器样式的持续对话框保护。 默认值为 false.
                spellcheck: false,//是否启用内置拼写检查器。 默认值为 true。
                resizable: false,//设置窗口不可调整大小
                hasShadow: false,//窗口是否有阴影
                autoHideMenuBar: true,//自动隐藏菜单栏，除非按了Alt键。 默认值为 false.
                frame: false,//无边框窗口
                transparent: true,//使窗口 透明。 默认值为 false. 在Windows上，仅在无边框窗口下起作用
                thickFrame: false,
                // opacity:0,
                webPreferences: {
                    webSecurity: false,
                    contextIsolation: true,//启用上下文隔离
                    sandbox: false,//启用沙盒
                    preload: preLoadPath, //预加载脚本，注入ipc所需对象
                    enableRemoteModule: true,//
                }
            }
            //如果模态框已存在且没有被销毁，重新调用
            if (__modalChildWin && !__modalChildWin.isDestroyed) {
                if (win.isMinimized()) {
                    win.restore()
                }
                __modalChildWin.focus()
                return
            }
            __modalChildWin = new BrowserWindow(winOptions)
            const isDev = process.env.NODE_ENV == 'development' ? true : false;
            if (isDev) {
                const localUrl = "http://localhost:3000/#/winchild"
                await __modalChildWin.loadURL(localUrl)
                __modalChildWin.show()
                __modalChildWin.setTitle(localUrl)
            } else {
                //路径必须是这样的，实际路径是：file:///[软件安装目录]/resources/app.asar/dist/index.html
                __modalChildWin.loadFile("./dist/index.html/", {
                    hash: '/winchild'
                })
                __modalChildWin.show()
                __modalChildWin.setTitle("子窗体")
            }
        })
        ipcMain.on('window:close-local-web', async (event, args) => {
            // log.d("==window:close-local-web==")
            if (__modalChildWin) {
                __modalChildWin.close()
            }
        })
    }
    this.unRegister = function (ipcMain) {

    }
}