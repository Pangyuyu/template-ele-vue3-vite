const {
    Menu, dialog
} = require('electron')
const appPackage = require("../package.json") //当前package包内容
const { Log } = require("./logUtil")
const log = new Log()

module.exports.AppMenu = function () {
    this.win = null;
    this.initMenu = function (win) {
        this.win = win;
        const template = [
            ...this.getCommonCustomMenu(),
            ...this.getCustomMenu(),
        ]
        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    }
    this.getCustomMenu = function () {
        return [
            {
                label: '编辑',
                submenu: [
                    {
                        label: '撤销',
                        accelerator: 'CmdOrCtrl+Z',
                        selector: 'undo:',
                        role: 'undo'
                    },
                    {
                        label: '重做',
                        accelerator: 'Shift+CmdOrCtrl+Z',
                        selector: 'redo:',
                        role: 'redo'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: '剪切',
                        accelerator: 'CmdOrCtrl+X',
                        selector: 'cut:',
                        role: 'cut'
                    },
                    {
                        label: '复制',
                        accelerator: 'CmdOrCtrl+C',
                        selector: 'copy:',
                        role: 'copy'
                    },
                    {
                        label: '粘贴',
                        accelerator: 'CmdOrCtrl+V',
                        selector: 'paste:',
                        role: 'paste'
                    },
                    {
                        label: '全选',
                        accelerator: 'CmdOrCtrl+A',
                        selector: 'selectAll:',
                        role: 'selectall'
                    }
                ]
            },
            {
                label: "帮助",
                submenu: [
                    {
                        label: "检查更新",
                        click: (event, focusedWindow, focusedWebContents) => {
                            console.log("检查更新 click01")
                            this.sendCheckVersion()
                        },
                    },
                    { type: "separator" },
                    {
                        label: "关于",
                        click: (event, focusedWindow, focusedWebContents) => {
                            this.showAbout()
                        },
                    },
                ],
            },
        ]
    }
    this.showAbout = function () {
        let appVersion = appPackage.version
        let detailMsg = `本软件：${appVersion}`;
        const infoList=["chrome","node","electron","v8","openssl"]        
        infoList.forEach(item=>{
            detailMsg += `\n${item}:${process.versions[item]}`
        })
        dialog.showMessageBox(this.win, {
            title: "关于",
            type: "info",
            message: "孤星",
            detail: detailMsg,
        })
    }
    this.sendCheckVersion = function () {
        if (this.win != null) {
            console.log("检查更新 sendCheckVersion")
            this.win.webContents.send('menuCheckVersion', {
                platform: process.platform,
                arch: process.arch,
                chromeVersion: process.versions.chrome
            })
        }
    }
    this.getCommonCustomMenu = function () {
        return [{
            label: "操作",
            submenu: [{
                label: "刷新",
                role: "reload"
            },
            {
                label: "强制刷新",
                role: "forceReload"
            },
            {
                type: "separator"
            },
            {
                label: "全屏/退出全屏",
                role: "togglefullscreen"
            },
            {
                label: "最小化",
                role: "minimize"
            },
            // { type: "separator" },
            {
                label: "开发者工具",
                role: "toggleDevTools",
                accelerator: "CommandOrControl+Shift+Alt+Up",
                visible: true,
                acceleratorWorksWhenHidden: true,
            },
            {
                type: "separator"
            },
            {
                label: "退出",
                role: "quit"
            }
            ],
        }]
    }
}