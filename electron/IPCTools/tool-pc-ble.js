const { createBluetooth } = require('node-ble')
/*windows测试结果
1.noble
    报错Error: No compatible USB Bluetooth 4.0 device found!，
2.node-ble
    不兼容windows
*/
/*PC端本地蓝牙*/
function timeSleep(timemilsecond) {
    return new Promise(async (resolve, __) => {
        // setTimeout(() => {
        //     resolve({
        //         code: 0,
        //         message: 'test',
        //         data: []
        //     })
        // }, timemilsecond)
        const { bluetooth, destroy } = createBluetooth()
        const adapter = await bluetooth.defaultAdapter()
        console.log(adapter)
        resolve({
            code: 0,
            message: 'test',
            data: adapter.devices
        })

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