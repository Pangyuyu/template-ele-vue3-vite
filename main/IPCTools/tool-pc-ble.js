const { Log } = require("../utils/log")
const log = new Log().withTag("tool-pc-ble")
/*windows测试结果
1.noble
    报错Error: No compatible USB Bluetooth 4.0 device found!，
    他大爷的，需要替换驱动，而且替换之后windows设置中就不支持了。
    参见：https://zhuanlan.zhihu.com/p/55476596、
    放弃
2.node-ble
    不兼容windows
3.navigator.bluetooth.requestDevice+select-bluetooth-device 方案
    参考资料：
    1.通过 JavaScript 与蓝牙设备通信:https://web.dev/bluetooth/;
    2.Web Bluetooth API:https://www.electronjs.org/zh/docs/latest/tutorial/devices
    3.Web Bluetooth Samples:https://googlechrome.github.io/samples/web-bluetooth/
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
const maxSelectCount = 100 //最大搜索次数
let selectCount = 0 //当前的搜索次数    
let selectDeviceId = "";//搜索的设备ID，若为空，则批量搜索
module.exports.ToolPcBle = function () {
    this.registerOn = function (ipcMain, mainWin) {
        ipcMain.handle("ble-set-search-deviceid", (event, args) => {
            const isNoArg = args == undefined || args == null || args.deviceId == undefined || args.deviceId == null || args.deviceId.length == 0
            selectDeviceId = isNoArg ? "" : args.deviceId
            return { code: 0, data: args.deviceId }
        })
        mainWin.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
            event.preventDefault()
            if (selectDeviceId.length == 0) {
                // log.d(selectCount, "发现蓝牙设备数量:", deviceList.length)
                mainWin.webContents.send('ble-on-scanning', {
                    code: 0,
                    data: deviceList
                })
            } else {
                const findDeviceItem=deviceList.find(item=>{return item.deviceId==selectDeviceId})
                if(findDeviceItem){
                    selectCount = 0
                    callback(findDeviceItem.deviceId)
                }
            }
            selectCount++
            if (selectCount >= maxSelectCount) {
                selectCount = 0
                callback("")
            }
        })
    }
    this.unRegister = function (ipcMain) {

    }
}