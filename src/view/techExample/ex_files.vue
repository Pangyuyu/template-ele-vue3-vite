<template>
    <el-tabs v-model="activeName" class="xing-tabs" type="card">
        <el-tab-pane name="ex_path">
            <template #label>
                <span class="custom-tabs-label">
                    <span>文件路径</span>
                </span>
            </template>
            <el-table :data="pathApiMethodList" border height="720" style="width:100%;">
                <el-table-column prop="name" label="名称" width="220" />
                <!-- <el-table-column label="参数" width="145">
                    <template #default="scope">
                        <div class="table-clm-ctrl">
                            <el-button type="primary" @click="onClickScanArgs(scope.row)">查看</el-button>
                        </div>
                    </template>
                </el-table-column> -->
                <el-table-column prop="retStr" label="返回" width="420" />
                <el-table-column prop="desc" label="描述" />
                <el-table-column label="操作" width="220">
                    <template #default="scope">
                        <div class="table-clm-ctrl">
                            <el-button type="success" @click="onClickTryOnce(scope.row)">试一试</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="panel-warn">
                <div class="item">1.API请参考 <a href="javascript:void(0);"
                        @click="onClickOpenWindowByUrl('http://nodejs.cn/api-v16/path.html#pathsep')">path 路径</a></div>
            </div>
        </el-tab-pane>
        <el-tab-pane name="ex_files">
            <template #label>
                <span class="custom-tabs-label">
                    <span>文件管理</span>
                </span>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>
import { json } from "stream/consumers";

<script lang="ts" setup>
// @ts-nocheck
import { ref, onMounted, watch } from "vue";
import RenderCmd from '@/../electron/RenderCmd'
import ApiModel from "@/common/data/api-model.json"
const activeName = ref("ex_path")
function onClickOpenWindowByUrl(url: string) {
    RenderCmd.childWinSend("...", url)
}
onMounted(() => {
    initApiPathMethods()
})

//#region API-path
const pathApiMethodList = ref(new Array())
function initApiPathMethods() {
    pathApiMethodList.value = ApiModel.path.map((item)=>{
        let retStr='[无返回值]'
        if(item.ret&&item.ret.type){
            retStr=`[${item.ret.type}]${item.ret.desc}`
        }
        return {
            ...item,
            retStr
        }
    })
}
function onClickScanArgs(methodItem) {

}
async function onClickTryOnce(methodItem) {
    const res = await window.EleApi.runApiPath(methodItem.name, {
        path: '/foo/bar/baz/asdf/quux.html'
    })
    console.log("onClickTryOnce", res)
}
//#endregion
</script>

<style lang="scss" scoped>
</style>