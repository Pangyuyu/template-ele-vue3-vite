// electron/preload.js
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const {contextBridge,ipcRenderer} =require('electron')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' /*去掉控制台关于security的警告*/
/*这是正确的写法，原先把主进程中的对象全部挂载在window上是错误的做法*/
contextBridge.exposeInMainWorld('EleApi',{
    openChildWin:(args)=>ipcRenderer.send('open-child-win',args),
    setTitle:(args)=>ipcRenderer.send('ipc-example-set-title',args),
    openFile:()=>ipcRenderer.invoke('ipc-example-file-choose')
})
