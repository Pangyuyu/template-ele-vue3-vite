const { BrowserWindow } = require('electron')
const path = require('path');
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
                let loadPath = path.resolve(__dirname, "../devTools/chrome")
                await session.defaultSession.loadExtension(loadPath);
            } catch (e) {
                console.error("Vue Devtools failed to install:", e.toString())
            }
        }
    }
    /**
     * 初始化窗体
     */
    this.initWindow = function () {
        return new BrowserWindow({
            width: 1600,
            height: 1200,
            minWidth: 1600,
            minHeight: 1200,
            webPreferences: {
                // Use pluginOptions.nodeIntegration, leave this alone
                // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
                // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
                webSecurity: false,
                // allowRunningInsecureContent:true,
                preload: path.join(__dirname, 'preload.js'), //预加载脚本，注入ipc所需对象
                // enableRemoteModule: true
            },
            show: false,
        })
    }
    /**
     * 初始化窗体加载
     * @param {BrowserWindow} win 窗体
     */
    this.initWinLoad = async function (win) {
        const isDev = process.env.IS_DEV == "true" ? true : false;
        if (isDev) {
            await win.loadURL("http://localhost:3000")
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
