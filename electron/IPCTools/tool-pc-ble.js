/*PC端本地蓝牙*/
function timeSleep(timemilsecond) {
    return new Promise((resolve, __) => {
        setTimeout(() => {
            resolve({
                code: 0,
                message: 'test',
                data: []
            })
        }, timemilsecond)
    })
}
module.exports.ToolPcBle = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.handle('ble-startscanning', async (event, args) => {
            await timeSleep(5000)
            return {
                code: 0,
                message: 'test',
                data: []
            }
        })
    }
    this.unRegister = function (ipcMain) {

    }
}