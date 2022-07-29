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
                    <div class="attr">{{ attr }}</div>
                    <el-input class="input" v-model="text_edit" :rows="22" type="textarea" placeholder="请输入您想要的信息" />
                </div>


                <div class="ctrl">
                    <el-button type="primary" @click="onClickChooseFile()">选择&读取文件</el-button>
                    <el-button type="success" @click="onClickSaveFile()">选择&保存文件</el-button>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane name="ex_down">
            <template #label>
                <span class="custom-tabs-label">
                    <span>下载文件</span>
                </span>
            </template>
            <!--选择目录（文件）、创建文件、读文件、写文件、保存文件 -->
            <div class="file-basic">
                后续有空再写...
                <!-- <el-form :data="formDownInfo">
                    <el-form-item label="下载文件路径"></el-form-item>
                </el-form> -->
            </div>
        </el-tab-pane>
    </el-tabs>
</template>
import { json } from "stream/consumers";

<script lang="ts" setup>
// @ts-nocheck
import { ref, onMounted, watch, reactive } from "vue";
import ApiModel from "@/common/data/api-model.json"
import { ElMessage } from 'element-plus'
const activeName = ref("ex_path")
function onClickOpenWindowByUrl(url: string) {
    window.EPre.openChildWin("...", url)
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
    const res = await window.EPre.runApiPath(methodItem.name, {
        path: '/foo/bar/baz/asdf/quux.html'
    })
    console.log("onClickTryOnce", res)
}
//#endregion

//#region 文件操作
const text_edit = ref("")
const attr = ref("")
async function onClickChooseFile() {
    const readRes = await window.EPre.fileChooseRead()
    if (readRes.code != 0) {
        ElMessage({
            message: "用户已取消!",
            type: "warning",
        })
        return
    }
    text_edit.value = readRes.data.fileContent
    attr.value = readRes.data.filePath + "\n" + JSON.stringify(readRes.data.fileStat, null, 4)
}
async function onClickSaveFile() {
    const writeRes = await window.EPre.fileChooseSave({ fileContent: text_edit.value })
    if (writeRes.code != 0) {
        ElMessage({
            message: writeRes.message,
            type: "warning",
        })
        return
    }
    ElMessage({
        message: "保存成功，文件路径:"+writeRes.data.filePath,
        type: "success",
    })
}
//#endregion

//#region 下载文件
const formDownInfo=reactive({
    url:'',
    fileName:'',
    md5:''
})
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
        height: 420px;

        .input {
            padding: 5px;
            flex-grow: 1;
            width: 0;
        }

        .attr {
            max-width: 320px;
            min-width: 320px;
            border-right: 1px solid #b8d1f7;
            background-color: black;
            color: white;
            font-size: 12px;
            padding: 5px;
            white-space: pre-wrap;
            margin-top: 10px;
        }
    }

    .ctrl {
        display: flex;
        margin-top: 10px;
    }
}
</style>