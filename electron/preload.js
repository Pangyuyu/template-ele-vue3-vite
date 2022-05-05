// electron/preload.js
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' /*去掉控制台关于security的警告*/

/*加载electron相关API供渲染线程调用*/
global.electron = require('electron');
window.ipcRenderer = require('electron').ipcRenderer;
window.remote = require('electron').remote;