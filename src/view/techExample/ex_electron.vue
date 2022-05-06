<template>
    <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
        <el-tab-pane label="进程间通信" name="ex_ipc">
            <div class="ipc-content">
                <el-button class="ex-btn" type="primary" @click="setMainWinTitle()">单项通信：渲染器进程-->主进程</el-button>
                <el-button class="ex-btn" type="success" @click="chooseFile()">双向通信：渲染器进程&lt;-->主进程</el-button>
                <el-button class="ex-btn" type="info">主进程到渲染器进程</el-button>
            </div>
            <div class="ipc-warn">
                <div class="item">1.出于 <a href="javascript:void(0);" @click="onClickcontextIsolation()">安全原因</a>，务必启用上下文隔离；</div>
                <div class="item">2.不要在预加载脚本中暴露主进程的API, 确保尽可能限制渲染器对 Electron API 的访问；</div>
                <div class="item">3.双向通信时,使用ipcRender.invoke;不要使用event.reply或者ipcRenderer.sendSync;这两种方法已过时；</div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent, getCurrentInstance, ref, onMounted } from "vue";
import RenderCmd from '@/../electron/RenderCmd'
import { ElMessage } from 'element-plus'
export default defineComponent({
    name: 'exElectron',
    setup() {
        const activeName = ref("ex_ipc")
        let i = 0
        function setMainWinTitle() {
            i++
            RenderCmd.setWinTitle(`测试标题:${i}`)
        }
        async function chooseFile() {
            const filePath = await window.EleApi.openFile()
            let message = ""
            let type = "info"
            if (filePath) {
                message = `选择了文件：\n${filePath}`
                type = 'success'
            } else {
                message = '您未选择任何文件'
                type = 'warning'
            }
            ElMessage({
                message: message,
                type: type,
            })
        }
        function onClickcontextIsolation() {
            RenderCmd.childWinSend("安全原因", "https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation#security-considerations")
        }
        return {
            activeName,
            setMainWinTitle,
            chooseFile,
            onClickcontextIsolation
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

    .ex-btn {
        min-width: 320px;
    }
}

.ipc-warn {
    display: flex;
    flex-direction: column;
    border: 1px solid olive;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    margin-top: 10px;
    .item{
        line-height: 35px;
    }
}
</style>