// electron/preload.js
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' /*去掉控制台关于security的警告*/
/*这是正确的写法，原先把主进程中的对象全部挂载在window上是错误的做法*/
contextBridge.exposeInMainWorld('EPre', {
    /*ipcRenderer方法
    1.invoke，异步调用，渲染进程需要使用async/await进行调用；主进程使用handle方法;
    2.send,同步调用，主进程使用on方法，不需要向渲染进程发回调；
    3.on,异步调用，主进程主动向渲染进程发送数据,渲染进程需要注册回调函数，主进程需要使用mainWin.webContents.send；
    */
    openChildWin: (args) => ipcRenderer.send('open-child-win', args),//打开子窗体
    setTitle: (args) => ipcRenderer.send('ipc-example-set-title', args),//设置窗体标题
    openFile: () => ipcRenderer.invoke('ipc-example-file-choose'),//打开文件
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback),//响应主进程命令（+1,-1）
    themeChange: (themeName) => ipcRenderer.invoke('ipc-example-theme-change', { themeName: themeName }),//更改主题（暗黑、明亮）
    //拖动文件
    startDrag: (fileName) => {
        ipcRenderer.send("ipc-example-on-drag-start", fileName)
    },
    /*进度条操作*/
    progressStart: () => ipcRenderer.send('ipc-example-progress-start'),//开始进度条
    progressCancel: () => ipcRenderer.send('ipc-example-progress-cancel'),//取消进度条
    progressUnkown: () => ipcRenderer.send('ipc-example-progress-unkown'),//设置进度条为未知状态

    dllMethod: (args) => ipcRenderer.invoke('dll-method', args),//调用DLL
    querySystemInfo: () => ipcRenderer.invoke("tool-system-info"),//查询系统信息

    /*子窗体操作*/
    windowChangeBgColor: () => { ipcRenderer.send('window:change-bgcolor') },//改变背景色
    windowOpenLocalWeb:()=>{ipcRenderer.send('window:open-local-web')},//渲染进程打开子窗体并显示本地网页
    windowCloseLocalWeb:()=>{ipcRenderer.send('window:close-local-web')},//渲染进程关闭子窗体

    //NODE api 调用
    runApiPath: (apiName, apiParams) => {
        return ipcRenderer.invoke("tool-api-path", {
            apiName: apiName,
            params: apiParams
        })
    },
    //显示主进程的弹窗
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
    /*文件操作*/
    fileChooseRead:()=>ipcRenderer.invoke('file-manager-choose-read'),//读取
    fileChooseSave:(args)=>ipcRenderer.invoke('file-manager-choose-save',args),//保存
    /*蓝牙相关*/
    // bleStartScanning:(args)=>ipcRenderer.invoke('ble-startscanning',args),
    bleOnScanning:(callback)=>ipcRenderer.on('ble-on-scanning', callback),//搜索蓝牙
    bleSetSearchDeviceId:(args)=>ipcRenderer.invoke('ble-set-search-deviceid',args), //设置搜索蓝牙的deviceId

    /*本地可执行文件*/
    localExeStart:(args)=>ipcRenderer.invoke('local-exe-start',args),
    localExeStop:(args)=>ipcRenderer.invoke('local-exe-stop',args),
})
