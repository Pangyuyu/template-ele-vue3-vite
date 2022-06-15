// electron/preload.js
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' /*去掉控制台关于security的警告*/
/*这是正确的写法，原先把主进程中的对象全部挂载在window上是错误的做法*/
contextBridge.exposeInMainWorld('EleApi', {
    /*ipcRenderer方法
    1.invoke，异步调用，渲染进程需要使用async/await进行调用；主进程使用handle方法;
    2.send,同步调用，主进程使用on方法，不需要向渲染进程发回调；
    3.on,异步调用，主进程主动向渲染进程发送数据,渲染进程需要注册回调函数，主进程需要使用mainWin.webContents.send；
    */
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
    windowOpenLocalWeb:()=>{ipcRenderer.send('window:open-local-web')},
    windowCloseLocalWeb:()=>{ipcRenderer.send('window:close-local-web')},
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
    },
    fileChooseRead:()=>ipcRenderer.invoke('file-manager-choose-read'),
    fileChooseSave:(args)=>ipcRenderer.invoke('file-manager-choose-save',args),
    /*蓝牙相关*/
    // bleStartScanning:(args)=>ipcRenderer.invoke('ble-startscanning',args),
    bleOnScanning:(callback)=>ipcRenderer.on('ble-on-scanning', callback),//搜索蓝牙
    bleSetSearchDeviceId:(args)=>ipcRenderer.invoke('ble-set-search-deviceid',args) //设置搜索蓝牙的deviceId
})
