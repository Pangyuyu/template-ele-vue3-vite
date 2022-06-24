const fs = require("fs")
const fsPromise = require('fs').promises //使用fs promises方法
const path = require("path")

const tag="copy_res"

// 这个数据是 星->十六进制(e6989f)->(1D4BC9C130E78C5D1629491079221F77)
const headerBuffer = Buffer.from([0x1D, 0x4B, 0xC9, 0xC1, 0x30, 0xE7, 0x8C, 0x5D, 0x16, 0x29, 0x49, 0x10, 0x79, 0x22, 0x1F, 0x77]);
function readResPlaintext(dirName, fileName) {
    return new Promise(async (resolve, __) => {
        const filePath = path.join(process.cwd(), "resplaintext", dirName, fileName + ".txt")
        console.log("filePath", filePath)
        if (!fs.existsSync(filePath)) {
            resolve({
                code: -1,
                message: `文件：${filePath}不存在，已自动忽略`
            })
            return
        }
        const fileContent = await fsPromise.readFile(filePath, "utf8")
        resolve({
            code: 0,
            data: fileContent
        })
    })
}

function convertXingFile(dirName, fileName) {
    return new Promise(async (resolve, __) => {
        const readFileRes = await readResPlaintext(dirName, fileName)
        if (readFileRes.code !== 0) {
            resolve(readFileRes)
            return
        }
        const content = readFileRes.data
        const copy_file_path = path.join(process.cwd(), "resources", dirName, fileName + ".xing")
        const headerLen = headerBuffer.length
        const contentBuffer = Buffer.from(content, "utf8")
        const xingBuffer = new ArrayBuffer(headerBuffer.length + contentBuffer.length * 2)
        const xingDv = new DataView(xingBuffer)
        for (let i = 0; i < headerLen; i++) {
            const item = headerBuffer[i]
            xingDv.setUint8(i, item)
        }
        for (let i = 0; i < contentBuffer.length; i++) {
            const item = contentBuffer[i]
            xingDv.setUint8((i * 2) + headerLen, item)
            const r = Math.round(Math.random() * 255);
            xingDv.setUint8((i * 2) + headerLen + 1, r) //TODO 加入随机数 0x00,0xFF(255)
        }
        await fsPromise.writeFile(copy_file_path, xingDv) //写文件
        resolve({
            code: 0,
            message: `文件写入成功,${copy_file_path}`
        })
    })
}


const runTest = async function () {
    let test_dirName = "files";
    let test_fileName = "shu_dao_nan"
    const readRes = await convertXingFile(test_dirName, test_fileName)
    console.log(readRes)
}
runTest()