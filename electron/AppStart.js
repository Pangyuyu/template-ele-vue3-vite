const { BrowserWindow } = require('electron')
const path = require('path');
const { Log } = require("./logUtil")
const log = new Log()
/**
 * APP启动时的方法封装
 */
module.exports.AppStart = function () {
    this.winRestoreFocus = function (win) {
        if (win) {
            if (win.isMinimized()) {
                win.restore()
            }
            win.focus()
        }
    }
    /**
     * 开发模式下安装Chrome调试工具
     */
    this.installDevtools = async function () {
        if (process.env.NODE_ENV != "production" && !process.env.IS_TEST) {
            // Install Vue Devtools
            try {
                // 新增的：安装vue-devtools
                const {
                    session
                } = require("electron");
                const path = require("path");
                const extPath = path.resolve(__dirname, "../shell-chrome")
                log.d("vue-devtools地址", extPath)
                session.defaultSession.loadExtension(extPath);
            } catch (e) {
                log.e("Vue Devtools failed to install:", e.toString())
            }
        }
    }
    /**
     * 初始化窗体
     */
    this.initWindow = function () {
        const preLoadPath = path.join(__dirname, 'preload.js')
        log.d("预加载文件地址", preLoadPath)
        return new BrowserWindow({
            width: 1600,
            height: 1200,
            minWidth: 1600,
            minHeight: 1200,
            webPreferences: {
                // Use pluginOptions.nodeIntegration, leave this alone
                // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
                nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
                webSecurity: false,
                // allowRunningInsecureContent:true,
                contextIsolation: true,//启用上下文隔离
                sandbox: false,//启用沙盒
                preload: preLoadPath, //预加载脚本，注入ipc所需对象
                enableRemoteModule: true,//
                // disableHtmlFullscreenWindowResize:true,//
                // v8CacheOptions:"bypassHeatCheckAndEagerCompile" //强制 blink 使用 v8 代码缓存策略
            },
            // fullscreen: true,//窗口为全屏
            // fullscreenable: true,//窗口是否可以进入全屏状态
            skipTaskbar: true,//是否在任务栏中显示窗口。 默认值为 false
            show: false,
            // 
        })
    }
    /**
     * 初始化窗体加载
     * @param {BrowserWindow} win 窗体
     */
    this.initWinLoad = async function (win) {
        const isDev = process.env.IS_DEV == "true" ? true : false;
        if (isDev) {
            this.installDevtools()
            const localUrl = "http://localhost:3000"
            log.l("加载地址", localUrl)
            await win.loadURL(localUrl)
            win.maximize()
            win.show()
            if (!process.env.IS_TEST) win.webContents.openDevTools()
        } else {
            win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`)
            win.maximize()
            win.show()
        }
        if (isDev) {
            win.webContents.openDevTools();
        }
        win.on("closed", function () {
            win = null
        })
    }
}
