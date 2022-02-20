class Utils {
    isEmpty(str: string | null): boolean {
        return !this.isNotEmpty(str);
    }
    isNotEmpty(str: string | null): boolean {
        return str != null && (str + '').trim().length > 0;
    }
    /**
     * 生成UUID v4
     */
    UUID(rmSp:boolean = false):string {
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        if (rmSp) {
            return uuid.replace(/-/g, '')
        } else {
            return uuid
        }
    }
    tryParseJson(jsonStr:any, defaultRet:any = {}) {
        if (!jsonStr || jsonStr == '') {
            return defaultRet
        }
        try {
            let ret = JSON.parse(jsonStr)
            return ret || defaultRet
        } catch (ex) {
            return defaultRet
        }
    }
    /**
     * 获取文件大小,保留两位小数
     * @param {number}} size 文件大小（byte）
     */
     computeFileSize(size:number) {
        if (size == undefined || size == null) {
            return "0字节";
        }
        if (size > 1048576) {
            return (size / 1048576).toFixed(2) + "MB";
        }
        if (size > 1024) {
            return (size / 1024).toFixed(2) + "KB";
        }
        return size + "字节";
    }
}
const utils = new Utils();
export default utils;
