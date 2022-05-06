<template>
    <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
        <el-tab-pane label="进程间通信" name="ex_ipc">
            <div class="ipc-content">
                <el-button class="ex-btn" type="primary" @click="setMainWinTitle()">单项通信：渲染器进程-->主进程</el-button>
                <el-button class="ex-btn" type="success">双向通信：渲染器进程&lt;-->主进程</el-button>
                <el-button class="ex-btn" type="info">主进程到渲染器进程</el-button>
            </div>

        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, onMounted } from "vue";
import RenderCmd from '@/../electron/RenderCmd'
export default defineComponent({
    name: 'exElectron',
    setup() {
        const activeName = ref("ex_ipc")
        let i=0
        function setMainWinTitle(){
            i++
            RenderCmd.setWinTitle(`测试标题:${i}`)
        }
        return {
            activeName,
            setMainWinTitle
        }
    }
})
</script>

<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
}
</style>

<style lang="scss" scoped>
.ipc-content {
    display: flex;
    .ex-btn{
        min-width: 320px;
    }
}
</style>