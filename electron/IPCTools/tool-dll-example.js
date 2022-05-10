/*此处是调用外部DLL
1.若DLL是32位，会报错“win32 error 193 ”，需要使用 32位的electron;
2.32位的electron需要在.npmrc或者.yarnrc中进行配置；
3.指针类型使用：pointer 声明
*/
const { Log } = require("../logUtil")
const log = new Log()
module.exports.ToolDllExample = function () {
    this.registerOn = function (ipcMain, mainWin) {
        let libm = null
        try {
            const ffi = require('ffi-napi')
            const path = require('path')
            const lib = path.resolve('./resources/dll/example.dll')
            log.d("地址", lib)
            libm = ffi.Library(lib, {
                'num_add': ['int', []],
                'num_add_ret': ['int', ['int']],
                'str_echo': ['string', ['string', 'pointer']]
            })
        } catch (ex) {
            log.e("加载dll异常", ex)
        }

        ipcMain.handle('dll-method', (event, args) => {
            log.d("参数",args)
            if (libm) {
                const methodName = args.name
                let res = ""
                let pointer = null
                if (methodName == 'num_add') {
                    res = libm.num_add()
                } else if (methodName == 'num_add_ret') {
                    res = libm.num_add_ret(args.params.a)
                } else if (methodName == 'str_echo') {
                    pointer = Buffer.alloc(4)
                    res = libm.str_echo(args.params.a, pointer)
                }
                let pointerStr = pointer ? pointer.readUInt32LE() : ""
                log.d(methodName, res, pointerStr)
                return {
                    code:0,
                    result: res,
                    data: pointerStr
                }
            }
            return {
                code:-1,
                msg:"加载DLL异常!"
            }
        })
    }
}