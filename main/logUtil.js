/*注意这个Log只用于主进程*/
/**
 * 日志封装
 */
module.exports.Log = function () {
    this.l=function(...msg){
        console.log(msg)
    }
    this.d = function (...msg) {
        console.debug(msg)
    }
    this.e=function(...msg){
        console.error(msg)
    }
}