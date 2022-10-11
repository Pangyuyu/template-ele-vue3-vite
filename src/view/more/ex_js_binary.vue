<template>
    <div class="vue-page">
        <el-tabs v-model="activeName" class="xing-tabs" type="card" style="flex-grow:1">
            <el-tab-pane name="ex_relational">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_relational')">对象关系</span>
                    </span>
                </template>
                <el-image :src="img_js_binary" class="img_js_binary" fit="scale-down" />
                <div class="panel-warn">
                    <div class="item">1.详情查看<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://zhuanlan.zhihu.com/p/568915443')">谈谈JS二进制：File、Blob、FileReader、ArrayBuffer、Base64</a>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_blob">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_blob')">Blob</span>
                    </span>
                </template>
                <div class="panel-content ex_blob_content">
                    <div>
                        <el-button type="primary" @click="onClickBlobBasic()">Blob:初始化</el-button>
                        <el-button type="primary" @click="onClickBlobSlice()">Blob:Slice</el-button>
                    </div>
                    <iframe :src="iframe_src" class="el-image"></iframe>
                </div>
                <div class="panel-warn">
                    <div class="item">1.Blob 全称为 binary large object ，即二进制大对象，它是 JavaScript 中的一个对象，表示原始的类似文件的数据。</div>
                    <div class="item">2.实际上，Blob 对象是包含有只读原始数据的类文件对象。简单来说，Blob 对象就是一个不可修改的二进制文件。</div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_file">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_file')">File</span>
                    </span>
                </template>
                <div class="panel-content ex_blob_content drag-region" 
                :class="draging?'drag-region-active':'drag-region-normal'"
                @dragover="onFileDragover"
                @drop="onFileDrop">
                    <el-button type="primary" @click="onClickChooseFile()">选择文件</el-button>
                    <input ref="vInputFile" type="file" id="fileInput" :multiple="true" @change="fileOnChange" hidden>
                    <el-table :data="tableFiles" border height="520" >
                        <el-table-column prop="name" label="文件名" width="320"/>
                        <el-table-column prop="sizeStr" label="文件大小"  width="120" />
                        <el-table-column prop="type" label="MIME" width="280"/>
                        <el-table-column prop="lastModifiedStr" label="文件最后修改日期" width="220"/>
                        <el-table-column prop="webkitRelativePath" label="文件路径或URL" width="220"/>
                    </el-table>
                </div>
                <div class="panel-warn">
                    <div class="item">1.File 对象中只存在于浏览器环境中，在 Node.js 环境中不存在。</div>
                    <div class="item">2.File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。Blob 的属性和方法都可以用于 File 对象。</div>
                    <div class="item">3.input组件使用请查看<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file')">{{inputLinkDesc}}</a>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance,ComponentInternalInstance,ref } from 'vue'
import ModalTool from '@/common/ui/ModalTool';
import img_js_binary from '@/assets/images/js_binary.jpg'
import utils from '@/common/utils/utils'
import time from '@/common/utils/time'
const activeName = ref("ex_relational")
const iframe_src = ref("")
const { proxy } = getCurrentInstance() as ComponentInternalInstance
function getPanelLabelClass(lableName: string) {
    if (activeName.value == lableName) {
        return 'panel-active'
    }
    return 'system-text'
}
//#region blob
function onClickOpenWindowByUrl(url: string) {
    window.EPre.openChildWin("...", url)
}
function onClickBlobBasic() {
    const msg = "Hello World"
    const blob = new Blob([msg], { type: "text/plain" })
    iframe_src.value = URL.createObjectURL(blob);
    ModalTool.ShowToast(`size:${blob.size};\ntype:${blob.type}`, "success")
}
function onClickBlobSlice() {
    const blob = new Blob(["Hello World"], { type: "text/plain" });
    const subBlob = blob.slice(0, 5);
    iframe_src.value = URL.createObjectURL(subBlob);
}
//#endregion

//#region file
const tableFiles=ref(new Array())
const inputLinkDesc=ref("<input type=\"file\">")
const vInputFile=ref()

function onClickChooseFile(){
    vInputFile.value.click()
}
function fileOnChange(e){
    listChooseFiles(e.target.files)
    //input组件选择之后把其value清空,保证下次选择同样的文件还可以触发change事件
    e.target.value = ""
}
const draging=ref(false)
function onFileDragover(e){
    e.preventDefault();
    draging.value=true
}
function onFileDrop(e){
    e.preventDefault();
    draging.value=false
    listChooseFiles(e.dataTransfer.files)
}
function listChooseFiles(targetFiles) {
    if(targetFiles==undefined||targetFiles==null||targetFiles.length==0){
        ModalTool.ShowToast("未选择任何文件","info")
        return
    }
    let tempFiles=[]
    //e.target.files不可以使用map,forEach
    for(let i=0;i<targetFiles.length;i++){
        const file=targetFiles[i]
        tempFiles.push({
            name:file.name,
            size:file.size,
            sizeStr:utils.computeFileSize(file.size),
            type:file.type,
            webkitRelativePath:file.webkitRelativePath,
            lastModified:file.lastModified,
            lastModifiedStr:time.timestamp2Str(file.lastModified,"yyyy-MM-dd hh:mm:ss")
        })
    }
    tableFiles.value=tempFiles
}
//#endregion 
</script>

<style lang="scss" scoped>
.vue-page {
    display: flex;
    flex-direction: column;
    height: 95%;
    padding: 5px;
}

.page-content {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    flex-grow: 1;
    height: 0;
}

.el-image {
    width: 620px;
    height: 200px;
    margin: 5px;
}

.img_js_binary {
    width: 620px;
    height: 620px;
}
.ex_blob_content{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: 620px;
}
.drag-region-normal{
    border: 1px solid #383b3b;
}
.drag-region-active{
    border: 1px solid #1eb2a8;
}
</style>