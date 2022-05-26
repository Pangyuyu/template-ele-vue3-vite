<template>
    <div class="win-outer">
        <el-button class="btnClose" type="danger" :icon="CircleClose" circle @click="onClickCloseWinChild()"></el-button>
        <div class="content">
            <!-- <el-button type="primary">打开子窗体：嵌套本地网页</el-button> -->
            <div class="warning">1.这个是独立的一个vue页面显示在子窗体中;</div>
            <div class="warning">2.无边框窗体；</div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import {
    CircleClose
} from '@element-plus/icons-vue'
function onClickCloseWinChild() {
    //@ts-ignore
    console.debug("子窗体对象", window.EleApi)
    //@ts-ignore
    window.EleApi.windowCloseLocalWeb()
}
</script>

<style lang="scss" scoped>
.win-outer {
    display: flex;
    justify-content: center;
    align-items: center;
    .btnClose{
        position:absolute;
        top: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
    }
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to bottom right, rgba(35, 39, 44, 0.8), rgba(68, 59, 47, 0.3));
    height: 720px;
    width: 720px;
    border-radius: 100px;
    border: 2px solid #5c78f2;

    .warning {
        line-height: 55px;
        color: white;
    }
    
}
</style>