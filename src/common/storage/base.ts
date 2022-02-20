export default class base{
    /**【同步】设置缓存
     * @param {Object} key 缓存中的key
     * @param {Object} jsonStr 字符串，若是对象，需要先转换为json才可以保存
     * @param {Object} fail 失败回调
     */
    static setSync(key: string, jsonStr: string):void {
        localStorage.setItem(key, jsonStr);
    }
    /**【同步】获取缓存中的数据，若未获取到则返回null
     * @param {Object} key 本地缓存中的指定的 key
     * @param {Object} fail 失败回调
     */
    static getSync(key:string):any {
        const value = localStorage.getItem(key);
        if(value!=undefined&&value!=null){
            return value;
        }
        return ""
    }
    static removeSync(key:string){
        localStorage.removeItem(key)
    }
    
}