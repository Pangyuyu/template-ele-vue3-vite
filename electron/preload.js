// electron/preload.js
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' /*去掉控制台关于security的警告*/
/*这是正确的写法，原先把主进程中的对象全部挂载在window上是错误的做法*/
contextBridge.exposeInMainWorld('EleApi', {
    /*注意：使用invoke是异步的方法，需要使用async/await进行调用*/
    openChildWin: (args) => ipcRenderer.send('open-child-win', args),
    setTitle: (args) => ipcRenderer.send('ipc-example-set-title', args),
    openFile: () => ipcRenderer.invoke('ipc-example-file-choose'),
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback),
    themeChange: (themeName) => ipcRenderer.invoke('ipc-example-theme-change', { themeName: themeName }),
    startDrag: (fileName) => {
        ipcRenderer.send("ipc-example-on-drag-start", fileName)
    },
    progressStart: () => ipcRenderer.send('ipc-example-progress-start'),
    progressCancel: () => ipcRenderer.send('ipc-example-progress-cancel'),
    progressUnkown: () => ipcRenderer.send('ipc-example-progress-unkown'),
    dllMethod: (args) => ipcRenderer.invoke('dll-method', args),
    querySystemInfo: () => ipcRenderer.invoke("tool-system-info"),
    windowChangeBgColor: () => { ipcRenderer.send('window:change-bgcolor') },
    runApiPath: (apiName, apiParams) => {
        return ipcRenderer.invoke("tool-api-path", {
            apiName: apiName,
            params: apiParams
        })
    },
    showDialog: (type, args) => {
        let topic = ''
        if (type == 'open') {
            topic = 'show-open-dialog-sync'
        } else if (type == 'save') {
            topic = 'show-save-dialog-sync'
        } else if (type == 'message') {
            topic = 'show-message-box-sync'
        } else if (type == 'error') {
            topic = 'show-error-box'
        }
        return ipcRenderer.invoke(topic, args)
    }
})
