<template>
    <div class="vue-page">
        <div class="ctrl">
            <el-button type="primary" @click="onClickTest01()">测试JS:无声明文件</el-button>
            <el-button type="primary" @click="onClickTest02()">测试JS:有声明文件</el-button>
            <el-button type="primary" @click="onClickTest03()">测试JS:IIFE无声明文件</el-button>
        </div>
        <div class="panel-warn">
            <div class="item">1.<a href="javascript:void(0)"
                    @click="onClickOpenWindowByUrl('https://segmentfault.com/a/1190000009247663')">如何编写一个d.ts文件</a>
            </div>
            <div class="item">2.<a href="javascript:void(0)"
                    @click="onClickOpenWindowByUrl('https://zhuanlan.zhihu.com/p/285270177')">了不起的 tsconfig.json 指南</a>
            </div>
            <div class="item">3.<a href="javascript:void(0)"
                    @click="onClickOpenWindowByUrl('https://juejin.cn/post/6987735091925483551')">一文读懂TS的(.d.ts)文件</a>
            </div>
            <div class="item">4.<a href="javascript:void(0)"
                    @click="onClickOpenWindowByUrl('https://segmentfault.com/a/1190000019768261')">TypeScript最佳实践：是否使用noImplicitAny</a>
            </div>
            <div class="item">5.<a href="javascript:void(0)"
                    @click="onClickOpenWindowByUrl('https://www.jianshu.com/p/47c29865b3a4')">tsconfig.json配置详解</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ModalTool from '@/common/ui/ModalTool'
/*若tsconfig.json的compilerOptions.strict配置为true（严格模式）
1.IDE会提醒：无法找到模块“xxx”的声明文件
2.不过构建可以通过，代码可以正常执行
另外，若引用了第三方js文件，最好把项目中的tsconfig.json的compilerOptions.noImplicitAny配置为false，否则IDE会有很多异常提醒
*/
import xiao from '@/jsexec/xiao'
import xuan from '@/jsexec/xuan'
import xing from '@/jsexec/xing'
function onClickTest01() {
    //无类型定义的，将所有的解析为any
    ModalTool.ShowDialogInfo("结果", xiao.sayHello("xiao"))
}
function onClickTest02() {
    //有类型定义的，将明确指出参数及返回值的类型
    ModalTool.ShowDialogInfo("结果", xuan.sayHello("xuan"))
}
function onClickTest03() {
    let x = new xing()
    ModalTool.ShowDialogInfo("结果", x.sayHello("xing"))
}
function onClickOpenWindowByUrl(url: string) {
    window.EPre.openChildWin("...", url)
}
</script>

<style lang="scss" scoped>
.vue-page {
    display: flex;
    flex-direction: column;
    padding: 5px;

    .ctrl {
        display: flex;
        flex-direction: row;
    }
}
</style>