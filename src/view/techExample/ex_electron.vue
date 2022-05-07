<template>
    <el-tabs v-model="activeName" class="demo-tabs" type="card">
        <el-tab-pane name="ex_ipc">
            <template #label>
                <span class="custom-tabs-label">
                    <span :class="getPanelLabelClass('ex_ipc')">进程间通信</span>
                </span>
            </template>
            <div class="panel-content">
                <el-button class="ex-btn" type="primary" @click="setMainWinTitle()">单项通信：渲染器进程-->主进程</el-button>
                <el-button class="ex-btn" type="success" @click="chooseFile()">双向通信：渲染器进程&lt;-->主进程</el-button>
                <el-button class="ex-btn" type="info" @click="onClickUpdateCounter()">主进程到渲染器进程:{{ testValue }}
                </el-button>
            </div>
            <div class="panel-warn">
                <div class="item">1.出于 <a href="javascript:void(0);"
                        @click="onClickOpenWindowByUrl('https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation#security-considerations')">安全原因</a>，务必启用上下文隔离；
                </div>
                <div class="item">2.不要在预加载脚本中暴露主进程的API, 确保尽可能限制渲染器对 Electron API 的访问；</div>
                <div class="item">3.双向通信时,使用ipcRender.invoke;不要使用event.reply或者ipcRenderer.sendSync;这两种方法已过时；</div>
                <div class="item">4.主进程向渲染进程发送消息时，需使用webContents.send方法</div>
            </div>
        </el-tab-pane>
        <el-tab-pane name="ex_darkmode">
            <template #label>
                <span class="custom-tabs-label">
                    <span :class="getPanelLabelClass('ex_darkmode')">主题样式</span>
                </span>
            </template>
            <div class="panel-content">
                <div>选择主题样式：</div>
                <el-select v-model="appTheme" placeholder="请选择" size="large">
                    <el-option v-for="item in themeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </el-tab-pane>
        <el-tab-pane name="ex_more">
            <template #label>
                <span class="custom-tabs-label">
                    <span :class="getPanelLabelClass('ex_more')">更多</span>
                </span>
            </template>
            <div class="panel-content">
                <template v-for="(item, index) in moreOptions" :key="index">
                    <a href="javascript:void(0);" @click="onClickOpenWindowByUrl(item.url)">{{item.label}}</a>
                </template>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { ref, onMounted, watch } from "vue";
import RenderCmd from '@/../electron/RenderCmd'
import { ElMessage, ElMessageBox } from 'element-plus'
onMounted(() => {
    registerEvents()
})

//#region 进程间通信
const testValue = ref(100)
function registerEvents() {
    window.EleApi.onUpdateCounter((_event, value) => {
        testValue.value += value
    })
}
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

function onClickOpenWindowByUrl(url: string) {
    RenderCmd.childWinSend("...", url)
}
function onClickUpdateCounter() {
    ElMessageBox.alert('请单击菜单栏中的“示例”子菜单', '提醒', {
        confirmButtonText: 'OK',
        callback: (action: Action) => {

        },
    })
}
function getPanelLabelClass(lableName: string) {
    if (activeName.value == lableName) {
        return 'panel-active'
    }
    if (useTheme.value == 'dark') {
        return 'dark-text'
    }
    if (useTheme.value == 'light') {
        return 'light-text'
    }
    return 'system-text'
}
//#endregion

//#region 设置主题样式
const appTheme = ref("")
const useTheme = ref("")
const themeOptions = ref([
    {
        label: "跟随系统",
        value: "theme-sys"
    },
    {
        label: "暗黑模式",
        value: "theme-dark"
    },
    {
        label: "明亮模式",
        value: "theme-light"
    }
])
watch(() => appTheme.value, (newValue: string, oldValue: string) => {
    onThemeChange()
})
async function onThemeChange() {
    const themeName = await window.EleApi.themeChange(appTheme.value)
    useTheme.value = themeName
}
//#endregion

//#region 更多
const moreOptions = ref([
    {
        label: '设备访问：蓝牙设备、键盘、游戏机等',
        url: 'https://www.electronjs.org/zh/docs/latest/tutorial/devices'
    },
    {
        label: '键盘快捷键',
        url: 'https://www.electronjs.org/zh/docs/latest/tutorial/keyboard-shortcuts'
    },
    {
        label: '多线程',
        url: 'https://www.electronjs.org/zh/docs/latest/tutorial/multithreading'
    }
])
//#endregion
</script>

<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
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
.panel-content {
    display: flex;
    font-size: 16px;
    align-items: center;

    .ex-btn {
        min-width: 320px;
    }

    a {
        margin-left: 10px;
        margin-right: 10px;
    }
}

.panel-warn {
    display: flex;
    flex-direction: column;
    border: 1px solid olive;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    margin-top: 10px;

    .item {
        line-height: 35px;
    }
}

.panel-active {
    color: hsl(214, 93%, 49%);
}

.dark-text {
    color: white;
}

.light-text {
    color: black;
}

.system-text {
    color: rgb(86, 89, 90);
}
</style>