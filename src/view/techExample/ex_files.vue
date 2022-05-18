<template>
    <el-tabs v-model="activeName" class="xing-tabs" type="card">
        <el-tab-pane name="ex_path">
            <template #label>
                <span class="custom-tabs-label">
                    <span>文件路径</span>
                </span>
            </template>
            <el-table :data="pathApiMethodList" border style="width:100%;height:620px">
                <el-table-column prop="name" label="名称" width="220" />
                <el-table-column prop="desc" label="描述" />
                <el-table-column label="操作" width="220">
                    <template #default="scope">
                        <div class="table-clm-ctrl">
                            <el-button type="primary" @click="onClickScanArgs(scope.row)">查看参数</el-button>
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
import { ref, onMounted, watch } from "vue";
import RenderCmd from '@/../electron/RenderCmd'
import ApiModel from "@/common/data/api-model.json"
const activeName = ref("ex_path")
function onClickOpenWindowByUrl(url: string) {
    RenderCmd.childWinSend("...", url)
}
onMounted(()=>{
    initApiPathMethods()
})

//#region API-path
const pathApiMethodList = ref(new Array())
function initApiPathMethods(){
    pathApiMethodList.value=ApiModel.path
}
function onClickScanArgs(methodItem){

}
function onClickTryOnce(methodItem){

}
//#endregion
</script>

<style lang="scss" scoped>
</style>