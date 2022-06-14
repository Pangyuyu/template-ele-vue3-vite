<template>
    <div class="vue-page">
        <div class="bar">
            <el-button type="primary" @click="onClickBleScaning">搜索蓝牙</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { ref, getCurrentInstance, ComponentInternalInstance, onMounted } from "vue";
import ModalTool from '@/common/ui/ModalTool'
async function onClickBleScaning() {
    ModalTool.ShowLoading("...")
    const scanRes = await window.EleApi.bleStartScanning({})
    ModalTool.HideLoading()
    console.log("搜索结果", scanRes)
}
</script>

<style lang="scss">
.vue-page {
    width: 100%;
    display: flex;
    flex-direction: column;

    .bar {
        height: 55px;
        border-bottom: 1px solid #dddddd;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
}
</style>