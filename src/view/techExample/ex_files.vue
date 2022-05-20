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
            <!--选择目录（文件）、创建文件、读文件、写文件、保存文件 -->
            <div class="file-basic">
                <div class="content">
                    <div class="attr">[此处显示文件属性]</div>
                    <el-input class="input" v-model="text_edit" :rows="12" type="textarea" placeholder="请输入您想要的信息" />
                </div>


                <div class="ctrl">
                    <el-button type="primary" @click="onClickChooseFile()">选择&读取</el-button>
                    <el-button type="success" @click="onClickSaveFile()">保存文件</el-button>
                </div>
            </div>
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
    pathApiMethodList.value = ApiModel.path.map((item) => {
        let retStr = '[无返回值]'
        if (item.ret && item.ret.type) {
            retStr = `[${item.ret.type}]${item.ret.desc}`
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

//#region 文件操作
const text_edit = ref("")
function onClickChooseFile() {

}
function onClickSaveFile() {

}
//#endregion
</script>

<style lang="scss" scoped>
.file-basic {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    .content {
        display: flex;
        flex-direction: row;

        .input {
            padding: 5px;
            flex-grow: 1;
            width: 0;
        }
        .attr{
            max-width: 220px;
            min-width: 220px;
            border-right: 1px solid #b8d1f7;
            background-color: black;
            color: white;
            font-size: 12px;
            padding: 5px;
        }
    }

    .ctrl {
        display: flex;
        margin-top: 10px;
    }
}
</style>