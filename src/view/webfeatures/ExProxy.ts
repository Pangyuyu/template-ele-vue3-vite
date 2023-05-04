let employee = {
    name: "mingyue"
}
let proxyEmployee = new Proxy(employee, {
    get: function (target:any, propKey:string) {
        if (propKey in target) {
            return target[propKey];
        } else {
            throw new ReferenceError(`不存在属性“${propKey}”`);
        }
    }
})
export default {
    showDebug() {
        const name=proxyEmployee.name
        const age=proxyEmployee.age //若无此属性，则会抛出异常
        return {
            name,
            age
        }
    }
}