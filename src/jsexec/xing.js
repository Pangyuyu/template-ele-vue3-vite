//IIFE： 立即调用函数表达式 方式
var xing = (function () {
    let a = 1
    function sayHello(name) {
        return `Hello!${name}`
    }
    return {
        sayHello
    }
}
)
export default xing
