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
            </el-tab-pane>
            <el-tab-pane name="ex_blob">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_blob')">Blob</span>
                    </span>
                </template>
                <div>
                    <el-button type="primary" @click="onClickBlobBasic()">Blob:初始化</el-button>
                    <el-button type="primary" @click="onClickBlobSlice()">Blob:Slice</el-button>
                </div>
                <iframe :src="iframe_src" class="el-image"></iframe>
            </el-tab-pane>
        </el-tabs>
        <div class="panel-warn">
            <div class="item">1.详情查看<a href="javascript:void(0)"
                    @click="onClickOpenWindowByUrl('https://zhuanlan.zhihu.com/p/568915443')">谈谈JS二进制：File、Blob、FileReader、ArrayBuffer、Base64</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ModalTool from '@/common/ui/ModalTool';
import img_js_binary from '@/assets/images/js_binary.jpg'
const activeName = ref("ex_relational")
const iframe_src = ref("")
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
</style>