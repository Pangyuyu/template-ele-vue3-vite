const { Log } = require("../logUtil")
const log = new Log()
/*windows测试结果
1.noble
    报错Error: No compatible USB Bluetooth 4.0 device found!，
    他大爷的，需要替换驱动，而且替换之后windows设置中就不支持了。
    参见：https://zhuanlan.zhihu.com/p/55476596、
    放弃
2.node-ble
    不兼容windows
*/
/*PC端本地蓝牙*/
function startScaning(win) {
    return new Promise(async (resolve, __) => {
        log.d("蓝牙设备列表", "startScaning")
        win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
            event.preventDefault()
            log.d("蓝牙设备列表", deviceList)
            callback('')
            resolve({
                code: 0,
                message: "OK",
                data: deviceList
            })

        })

    })
}
let selectCount = 0
module.exports.ToolPcBle = function () {
    this.registerOn = function (ipcMain, mainWin) {
        mainWin.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
            event.preventDefault()
            // log.d("蓝牙设备列表", deviceList)
            mainWin.webContents.send('ble-on-scanning', {
                code: 0,
                data: deviceList
            })
            selectCount++
            if (selectCount >= 100) {
                selectCount = 0
                callback("")
            }
        })
    }
    this.unRegister = function (ipcMain) {

    }
}