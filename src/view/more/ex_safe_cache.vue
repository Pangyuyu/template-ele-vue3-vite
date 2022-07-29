<template>
    <div class="vue-page">
        <div class="page-content">
            <el-input v-model="plainText" class="el-text" :rows="12" type="textarea" placeholder="请输入要加密的文本"></el-input>
            <div class="ctrl">
                <el-button type="success" class="el-btn" @click="onClickEncrypt()">加密 <el-icon class="el-icon--right">
                        <ArrowRight />
                    </el-icon>
                </el-button>
                <el-button :icon="ArrowLeft" type="primary" class="el-btn" @click="onClickDecrypt()">解密</el-button>
            </div>
            <el-input v-model="encrypted" class="el-text" :rows="12" type="textarea" placeholder="请输入要解密的文本"></el-input>
        </div>
        <div class="panel-warn">
            <div class="item">1.详情查看<a href="javascript:void(0)"
                    @click="onClickOpenWindowByUrl('https://www.electronjs.org/zh/docs/latest/api/safe-storage')">安全存储</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
const plainText = ref("")
const encrypted = ref("")
async function onClickEncrypt() {
    const res = await window.EPre.appSafeEncrypt(plainText.value)
    encrypted.value = res.data
}
async function onClickDecrypt() {
    const res = await window.EPre.appSafeDecrypt(encrypted.value)
    plainText.value = res.data
}
function onClickOpenWindowByUrl(url: string) {
    window.EPre.openChildWin("...", url)
}
</script>

<style lang="scss" scoped>
.vue-page{
    display: flex;
    flex-direction: column;
}
.page-content {
    display: flex;
    flex-direction: row;
    padding-top: 20px;
}

.el-text {
    flex-grow: 1;
    margin-left: 10px;
    margin-right: 10px;
}

.ctrl {
    width: 220px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.el-btn {
    width: 120px;
    margin-bottom: 10px;
    margin-left: 0px;
    margin-right: 0px;
}
</style>