/*串口通信*/
const { Log } = require("../logUtil")
const log = new Log()
module.exports.ToolSerialPort = function () {
    this.registerOn = function (ipcMain, mainWin) {
        mainWin.webContents.session.on("select-serial-port", (event, portList, webContents, callback) => {
            event.preventDefault()
            
            /*
            [
                 {
                   portId: '3D85BFF930A249ABCEE03BA9CE4DFF22',
                   portName: 'COM1',
                   displayName: 'HHD Software Bridged Serial Port',
                   deviceInstanceId: 'ROOT\\PORTS\\0000'
                 },
                 {
                   portId: '8CB3D217BCE1E9038206F77F079D6FFD',
                   portName: 'COM2',
                   displayName: 'HHD Software Bridged Serial Port',
                   deviceInstanceId: 'ROOT\\PORTS\\0001'
                 }
               ]
            */
            // if (portList && portList.length > 0) {
            //     callback({
            //         code: 0,
            //         message: "success",
            //         data: portList,
            //     })              
            // } else {
            //     callback({
            //         code: -1,
            //         message: '未发现任何串口设备'
            //     })
            // }
            if (portList && portList.length > 0) {
                log.d("select-serial-port", portList[0].portId)
                callback(portList[0].portId)
            } else {
                callback("") //Could not find any matching devices
            }
        })
        mainWin.webContents.session.on("serial-port-added", (event, port) => {
            log.d('serial-port-added FIRED WITH', port)
        })
        mainWin.webContents.session.on('serial-port-removed', (event, port) => {
            log.d('serial-port-removed FIRED WITH', port)
        })
        mainWin.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
            log.d("setPermissionCheckHandler permission", permission)
            log.d("setPermissionCheckHandler details", details)
            if (permission === 'serial') {
                return true
            }
        })

        mainWin.webContents.session.setDevicePermissionHandler((details) => {
            log.d("setDevicePermissionHandler permission", permission)
            log.d("setDevicePermissionHandler details", details)
            if (details.deviceType === 'serial') {
                return true
            }
        })
    }
}