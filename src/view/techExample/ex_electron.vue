<template>
    <el-tabs v-model="activeName" class="xing-tabs" type="card">
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
                        @click="onClickOpenWindowByUrl('https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation#security-considerations')">安全原因</a>,务必启用上下文隔离；
                </div>
                <div class="item">2.不要在预加载脚本中暴露主进程的API, 确保尽可能限制渲染器对 Electron API 的访问；</div>
                <div class="item">3.双向通信时,使用ipcRender.invoke;不要使用event.reply或者ipcRenderer.sendSync;这两种方法已过时；</div>
                <div class="item">4.主进程向渲染进程发送消息时U+002c需使用webContents.send方法</div>
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
        <el-tab-pane name="ex_system">
            <template #label>
                <span class="custom-tabs-label">
                    <span :class="getPanelLabelClass('ex_system')">系统信息</span>
                </span>
            </template>
            <div class="panel-content">
                <el-button class="ex-btn" type="primary" @click="onClickGetSystemInfo()">获取系统信息</el-button>
            </div>
            <el-table :data="sysWinAttrList" border style="width:100%;height:420px">
                <el-table-column prop="name" label="名称" width="220" />
                <el-table-column prop="desc" label="描述" width="220" />
                <el-table-column prop="value" label="值" />
            </el-table>
        </el-tab-pane>
        <el-tab-pane name="ex_window">
            <template #label>
                <span class="custom-tabs-label">
                    <span :class="getPanelLabelClass('ex_window')">窗体操作</span>
                </span>
            </template>
            <div class="panel-content">
                <el-button class="ex-btn" type="primary" @click="onClickCtrlBgColor()">设置窗体背景颜色</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane name="ex_drag_drop">
            <template #label>
                <span class="custom-tabs-label">
                    <span :class="getPanelLabelClass('ex_drag_drop')">原生文件拖 & 放</span>
                </span>
            </template>
            <div class="div_drag" draggable="true" @dragstart="onDragStartFile">拖动我</div>

            <div class="div_drop" @drop="onDropFiles" @dragover.prevent>
                <div style="margin:10px">把文件拖动到此处</div>
                <el-table :data="dropFiles" style="width: 100%">
                    <el-table-column prop="name" label="name" width="220" />
                    <el-table-column prop="size" label="size" width="180" />
                    <el-table-column prop="path" label="path" />
                </el-table>
            </div>
            <div class="panel-warn">
                <div class="item">1.从窗体拖动文件暂时只支持开发模式；</div>
                <div class="item">2.h5元素可以通过drop来相应拖动文件;但是读取文件的内容U+002c务必在主线程中处理；</div>
            </div>
        </el-tab-pane>
        <el-tab-pane name="ex_notify">
            <template #label>
                <span class="custom-tabs-label">
                    <span :class="getPanelLabelClass('ex_notify')">通知</span>
                </span>
            </template>
            <div class="panel-content">
                <el-button type="primary" @click="onClickNotifyRenderer()">渲染进程显示通知</el-button>
                <el-button type="primary" @click="onClickNotifyMain()">主进程显示通知</el-button>
            </div>
            <div class="panel-warn">
                <div class="item">1.渲染进程使用Notification完成通知;此方式需要检验通知授权情况;详情参见：<a href="javascript:void(0)"
                        @click="onClickOpenWindowByUrl('https://developer.mozilla.org/zh-CN/docs/Web/API/notification')">notification</a>
                </div>
                <div class="item">2.electron-notification-state;此模块可以检测是否允许发送通知;</div>
                <div class="item">3.windows上合理设置app.setAppUserModelId</div>
                <div class="item">4.操作系统对通知正文字数有限制;详情参见：<a href="javascript:void(0)"
                        @click="onClickOpenWindowByUrl('https://www.electronjs.org/zh/docs/latest/tutorial/notifications')">通知（Notifications）</a>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane name="ex_progress">
            <template #label>
                <span class="custom-tabs-label">
                    <span :class="getPanelLabelClass('ex_progress')">进度条</span>
                </span>
            </template>
            <div class="panel-content">
                <el-button type="primary" @click="onClickProgressStart()" style="width:200px">启动进度条</el-button>
                <el-button type="warning" @click="onClickProgressCancel()" style="width:200px">取消进度条</el-button>
                <el-button type="info" @click="onClickProgressUnkown()" style="width:200px">设置进度条为不确定</el-button>
            </div>
            <div class="panel-warn">
                <div class="item">1.进度条的值在0~1之间；</div>
                <div class="item">2.值为“-1”是取消进度条；</div>
                <div class="item">3.值大于“1”显示一个不确定的状态；</div>
            </div>
        </el-tab-pane>
        <el-tab-pane name="ex_serialport">
            <template #label>
                <span class="custom-tabs-label">
                    <span :class="getPanelLabelClass('ex_serialport')">串口通信</span>
                </span>
            </template>
            <div class="panel-content">
                <el-button type="primary" @click="onClickSerialPortFilter()" style="width:200px">查找\打开串口</el-button>
                <el-button type="primary" @click="onClickSerialPortSend()" style="width:200px">发送</el-button>
                <el-button type="primary" @click="onClickSerialPortClose()" style="width:200px">关闭串口</el-button>
            </div>
            <div class="panel-content">
                <div>接收数据</div>
                <div class="serial-accept">{{ serialPortMsg }}</div>
                <el-button type="primary" @click="onClickClear()">清空</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane name="ex_dll">
            <template #label>
                <span class="custom-tabs-label">
                    <span :class="getPanelLabelClass('ex_dll')">调用DLL</span>
                </span>
            </template>
            <div class="panel-content">
                <el-button type="primary" @click="onClickDllMethods('num_add')" style="width:200px">方法:num_add
                </el-button>
            </div>
            <div class="panel-content">
                <el-input-number v-model="dll_add_ret" :min="1" :max="1000" style="width:200px" />
                <el-button type="primary" @click="onClickDllMethods('num_add_ret')"
                    style="width:200px;margin-left: 10px;">方法:num_add_ret</el-button>
            </div>
            <div class="panel-content">
                <el-input v-model="dll_str_echo" placeholder="Please input" style="width:200px" />
                <el-button type="primary" @click="onClickDllMethods('str_echo')" style="width:200px;margin-left: 10px;">
                    方法:str_echo</el-button>
            </div>
            <div class="panel-warn">
                <div class="item">1.调用第三方DLL需使用ffi-napi;</div>
                <div class="item">2.electron高版本需主线程使用ffi-napi;</div>
                <div class="item">3.若DLL是32位，会报错“win32 error 193 ”，需要使用 32位的electron;</div>
                <div class="item">4.32位的electron需要在.npmrc或者.yarnrc中对arch配置为 ia32;</div>
                <div class="item">5.指针类型使用：pointer 声明</div>
                <div class="item">6.当前只适用于windows系统且Electron是32位；</div>
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
                    <a href="javascript:void(0);" @click="onClickOpenWindowByUrl(item.url)">{{ item.label }}</a>
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
    onThemeChange()
    initSysWinAttrs()
    registerEvents()
})

//#region 系统信息
const sysWinAttrList = ref(new Array())
function initSysWinAttrs() {
    sysWinAttrList.value = [
        {
            name: 'process.versions.chrome',
            desc: 'Chrome 版本号',
            value: ''
        },
        {
            name: 'process.versions.electron',
            desc: 'Electron 版本号',
            value: ''
        },
        {
            name: 'process.platform',
            desc: '操作系统(Electron)',
            value: ''
        },
        {
            name: 'process.arch',
            desc: '操作系统位数(Electron)',
            value: ''
        },
        {
            name: 'process.getSystemVersion()',
            desc: '操作系统的版本',
            value: ''
        },
        {
            name: 'process.resourcesPath',
            desc: 'resources 目录的路径',
            value: ''
        },
    ]
    onClickGetSystemInfo()
}
async function onClickGetSystemInfo() {
    const atrrValues = await window.EleApi.querySystemInfo()
    sysWinAttrList.value.forEach(item=>{
        const attrItem=atrrValues.find(attr=>{return attr.name==item.name})
        if(attrItem){
            item.value=attrItem.value
        }
    })
}
//#endregion

//#region 进程间通信
const testValue = ref(100)
function registerEvents() {
    window.EleApi.onUpdateCounter((_event, value) => {
        testValue.value += value
    })
}
const activeName = ref("ex_darkmode")
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
const appTheme = ref("theme-sys")
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
// #endregion

//#region 拖动文件
function onDragStartFile(_event) {
    _event.preventDefault()
    window.EleApi.startDrag('drag-and-drop.md')
}
const dropFiles = ref(new Array())
function onDropFiles(_event) {
    _event.preventDefault()
    const files = _event.dataTransfer.files;
    console.log("onDropFiles", files)
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const fileItem = files[i]
            dropFiles.value.push({
                name: fileItem.name,
                path: fileItem.path,
                size: fileItem.size
            })
        }
    }
}
//#endregion

//#region 显示通知
function onClickNotifyRenderer() {
    //检测是否同意接受通知
    if (!("Notification" in window)) {
        ElMessage({
            message: "此浏览器不支持桌面通知",
            type: "warning",
        })
        return
    }
    if (Notification.permission === 'granted') {
        showNotify()
        return
    }
    if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                showNotify()
            }
        })
    }
    // 最后如果执行到这里,说明用户已经拒绝对相关通知进行授权
    // 出于尊重我们不应该再打扰他们了
    ElMessage({
        message: "用户已拒绝通知;请勿打扰!",
        type: "warning",
    })

}
function showNotify() {
    const NOTIFICATION_TITLE = '提醒'
    const NOTIFICATION_BODY = '请于明天下午进行核酸检测~~'
    const CLICK_MESSAGE = '您已阅读了此通知!'
    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
        .onclick = () => {
            ElMessage({
                message: CLICK_MESSAGE,
                type: "success",
            })
        }
}
function onClickNotifyMain() {
    ElMessageBox.alert('请单击菜单栏中的“示例”子菜单“主进程显示通知”', '提醒', {
        confirmButtonText: 'OK',
        callback: (action: Action) => {

        },
    })
}
//#endregion

//#region 进度条
function onClickProgressStart() {
    window.EleApi.progressStart()
}
function onClickProgressCancel() {
    window.EleApi.progressCancel()
}
function onClickProgressUnkown() {
    window.EleApi.progressUnkown()
}
//#endregion

//#region 串口通信
const filters = [
    { usbVendorId: 0x2341, usbProductId: 0x0043 },
    { usbVendorId: 0x2341, usbProductId: 0x0001 }
]
/*使用 Web Serial API 在浏览器上实现基于 WEB 的串口通信:https://blog.csdn.net/weixin_41231535/article/details/115218293*/
let keepReading = true;
let reader;
let writer;
// all data parsed are stored in a list ordered by received time of the data frame.
let receivedframe = [];

async function onClickSerialPortFilter() {
    // 提示用户选择一个串口。
    // const port = await navigator.serial.requestPort();
    // 获取用户之前授予该网站访问权限的所有串口。
    //const ports = await navigator.serial.getPorts();
    try {
        /*https://developer.mozilla.org/en-US/docs/Web/API/Serial/requestPort*/
        console.log("start")
        const port = await navigator.serial.requestPort();
        console.log("等待串口打开")
        // 等待串口打开
        await port.open({ baudRate: 9600 });
        console.log("串口已打开")
        keepReading = true;
        reader = port.readable.getReader();
        writer = port.writable.getWriter();
        // set how to write to device intervally
        // const writeInt = setInterval(async () => {
        //     const commandframe = new Uint8Array([
        //         0x00,
        //         0xff /*...some bytes to be sent*/,
        //     ]);
        //     await writer.write(commandframe);
        // }, 3000); // send a frame every 3000ms
        while (port.readable && keepReading) {
            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) {
                        // Allow the serial port to be closed later.
                        reader.releaseLock();
                        // Allow the serial port to be closed later.
                        writer.releaseLock();
                        break;
                    }
                    if (value) {
                        /*** TODO: deal with the data value ***/
                        dealWithData(value);
                    }
                }
            } catch (error) {
                // Handle non-fatal read error.
                console.error(error);
            } finally {
                console.log(port.readable, keepReading);
            }
        }
        clearInterval(writeInt);
        await port.close();
        console.log("port closed");
    } catch (ex) {
        console.error("串口设备查询失败", ex)
    }
}
//TODO 解析帧
const serialPortMsg = ref("")
function dealWithData(value) {
    console.log("接收数据：" + value)
    serialPortMsg.value += `${value}\r\n`
}
function onClickSerialPortClose() {
    keepReading = false
}
async function onClickSerialPortSend() {
    const commandframe = new Uint8Array([
        0x00,
        0xff /*...some bytes to be sent*/,
    ]);
    await writer.write(commandframe);
}
function onClickClear() {
    serialPortMsg.value = ""
}
//#endregion 

//#region 调用第三方DLL
const dll_add_ret = ref(1)
const dll_str_echo = ref("Hello World")
async function onClickDllMethods(methodName: string) {
    let aValue = ""
    if (methodName == 'num_add_ret') {
        aValue = dll_add_ret.value
    } else if (methodName == 'str_echo') {
        aValue = dll_str_echo.value
    }
    const methodRes = await window.EleApi.dllMethod({ name: methodName, params: { a: aValue } })
    ElMessage({
        message: methodRes,
        type: "success",
    })
}
//#endregion

//#region 窗体(BrowerWindow)操作
function onClickCtrlBgColor(){
    window.EleApi.windowChangeBgColor()
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
    },
    {
        label: '离屏渲染',
        url: "https://www.electronjs.org/zh/docs/latest/tutorial/offscreen-rendering"
    },
    {
        label: "在线/离线事件探测",
        url: "https://www.electronjs.org/zh/docs/latest/tutorial/online-offline-events"
    },
    {
        label: "最近的文件",
        url: "https://www.electronjs.org/zh/docs/latest/tutorial/recent-documents"
    },
    {
        label: "拼写检查器",
        url: "https://www.electronjs.org/zh/docs/latest/tutorial/spellchecker"
    }
])
//#endregion

</script>

<style lang="scss" scoped>
.panel-active {
    color: hsl(214, 89%, 57%);
    font-weight: 700;
}

.dark-text {
    color: rgb(195, 214, 228);
}

.light-text {
    color: black;
}

.system-text {
    color: rgb(86, 89, 90);
}

.div_drag {
    border: 2px solid black;
    border-radius: 3px;
    padding: 5px;
    width: 160px;
    height: 95px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.div_drop {
    border: 1px solid rgb(226, 201, 201);
    border-radius: 5px;
    padding: 5px;
    width: 100%;
    height: 650px;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    font-size: 16px;
}

.div_drop:hover {
    border: 2px solid rgb(223, 159, 159);
}

.serial-accept {
    height: 620px;
    width: 420px;
    border: 1px solid rgb(226, 201, 201);
    border-radius: 5px;
    padding: 5px;
    margin: 10px;
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
}
</style>