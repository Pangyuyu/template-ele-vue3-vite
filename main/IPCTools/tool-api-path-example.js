/*对于API操作：PATH*/
const { Log } = require("../utils/log")
const log = new Log().withTag("tool-api-path-example")
const path = require("path")
function run_basename(pathstr, ext) {
    if (ext) {
        return path.basename(pathstr, ext)
    } else {
        return path.basename(pathstr)
    }
}
module.exports.registerOn = function (ipcMain, mainWin) {
    ipcMain.handle('tool-api-path', (event, args) => {
        log.d("ToolApiPathExample", args)
        const apiName = args.apiName
        const params = args.params
        let resData = ""
        if (apiName == 'basename') {
            resData = run_basename(params.path, params.ext)
        }
        log.d("ToolApiPathExample", resData)
        return {
            code: 0,
            data: resData
        }
    })
}
module.exports.unRegister = function (ipcMain) {
    ipcMain.removeHandler('tool-api-path')
}