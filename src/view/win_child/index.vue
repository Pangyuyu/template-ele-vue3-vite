<template>
    <div class="content">
        <el-button class="btnClose" type="danger" :icon="CircleClose" circle @click="onClickCloseWinChild()">
        </el-button>
        <div class="warning">1.这个是独立的一个vue页面显示在子窗体中;</div>
        <div class="warning">2.无边框窗体；</div>
    </div>

</template>

<script lang="ts" setup>
import {
    CircleClose
} from '@element-plus/icons-vue'
function onClickCloseWinChild() {
    //@ts-ignore
    console.debug("子窗体对象", window.EPre)
    //@ts-ignore
    window.EPre.windowCloseLocalWeb()
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    background-image: linear-gradient(to bottom right, rgba(35, 39, 44, 0.8), rgba(97, 75, 238, 0.3));
    height: 720px;
    width: 720px;
    border-radius: 100px;
    border: 2px solid #5c78f2;

    .warning {
        line-height: 55px;
        color: white;
    }

    .btnClose {
        position: absolute;
        top: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
    }

}
</style>