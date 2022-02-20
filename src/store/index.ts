import { createStore } from 'vuex'
import getters from './getters'

interface MODULES {
    [key: string]: any;
}

const modulesList = import.meta.globEager("./modules/*.ts")

const modules: MODULES = {}
for (const key in modulesList) {
    const moduleName: string = key.replace(/^\.\/modules\/(.*)\.\w+$/, '$1') //取文件名
    const value: any = modulesList[key] //取文件的内容
    modules[moduleName] = value.default //赋值
}

const Store = createStore({
    modules,
    getters
})

export default Store