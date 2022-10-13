let a=1
function sayHello(name){
    return `Hello!${name}`
}
//若没有下面这句话，则会报错
//“ The requested module 'xxxx' does not provide an export named 'default'”
export default {sayHello}