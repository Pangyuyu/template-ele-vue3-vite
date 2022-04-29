// electron/preload.js
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  for (const dependency of ['chrome', 'node', 'electron']) {
    console.debug(`${dependency}-version`, process.versions[dependency])
  }
})
// for (const dependency of ['chrome', 'node', 'electron']) {
//   log.d(`${dependency}-version`, process.versions[dependency])
// }
/*去掉控制台关于security的警告*/
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'