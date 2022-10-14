//如何编写一个d.ts文件 https://segmentfault.com/a/1190000009247663
//了不起的 tsconfig.json 指南 https://zhuanlan.zhihu.com/p/285270177
//一文读懂TS的(.d.ts)文件 https://juejin.cn/post/6987735091925483551
//TypeScript最佳实践：是否使用noImplicitAny https://segmentfault.com/a/1190000019768261
//tsconfig.json配置详解 https://www.jianshu.com/p/47c29865b3a4
declare interface Xuan{
    sayHello(name:string):string
}
declare var xuan:Xuan
export default xuan;

