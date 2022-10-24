<template>
    <div class="vue-page">
        <div class="vue-ctrl">
            <div style="margin-right:10px">本地服务端口号:</div>
            <el-input-number v-model="port" :min="5001" :max="65535" size="small" style="max-height: 35px;" />
            <el-button @click="onClickAutoPort" type="success" style="margin-left:10px">自动选择</el-button>
            <div style="margin-right:10px;margin-left: 20px;">操作:</div>
            <el-button type="primary" @click="onClickLocalServerStart()">启动</el-button>
            <el-button type="info" @click="onClickLocalServerStop()">关闭</el-button>
        </div>
        <el-tabs v-model="activeName" class="xing-tabs" type="card">
            <el-tab-pane name="ex_list">
                <template #label>
                    <span class="custom-tabs-label">
                        <span>列表:Sqlite</span>
                    </span>
                </template>
                <div class="vue-ctrl">
                    <el-input v-model="query" placeholder="请输入用户名" class="query" />
                    <el-button type="primary" @click="onClickGetList()">查询</el-button>
                    <el-button type="success" @click="onClickAdd()">添加客户</el-button>
                </div>
                <el-table :data="customerList" border height="720" style="width:100%;">
                    <el-table-column prop="id" label="id" />
                    <el-table-column prop="name" label="名称" />
                    <el-table-column prop="address" label="地址" />
                    <el-table-column prop="phone" label="手机号" />
                    <el-table-column label="操作">
                        <template #default="scoped">
                            <div class="ctrl">
                                <el-button type="info" @click="onClickEdit(scoped.row)">修改</el-button>
                                <el-button type="danger" @click="onClickDelete(scoped.row)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="panel-warn">
                    <div class="item">1.本地服务是使用go语言写的;</div>
                    <div class="item">2.当前只支持windows;</div>
                    <div class="item">3.服务地址:http://localhost:{port}</div>
                    <div class="item">4.服务以当前程序的子进程运行;</div>
                    <div class="item">5.本地服务源码:<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://github.com/Pangyuyu/xing_study/tree/master/ex_go_server')">ex_go_server</a>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_img">
                <template #label>
                    <span class="custom-tabs-label">
                        <span>随机图片</span>
                    </span>
                </template>
                <div class="vue-ctrl">
                    <div class="hint">图片获取方式：</div>
                    <el-select v-model="imgType">
                        <el-option v-for="item in imgTypeOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <div class="hint">图片宽度：</div>
                    <el-input-number v-model="imgw" :min="1" :max="1000000" size="small" style="max-height: 35px;" />
                    <div class="hint">图片高度：</div>
                    <el-input-number v-model="imgh" :min="1" :max="1000000" size="small" loading="lazy" />
                    <el-button @click="onClickStartRefreshImg()" style="margin-left: 10px;" :disabled="refreshFlag">
                        开始刷新图片</el-button>
                    <el-button @click="onClickStopRefreshImg()" style="margin-left: 10px;" :disabled="!refreshFlag">
                        停止刷新图片</el-button>
                    <div style="margin-left:10px">{{ refershCount }}</div>
                    <el-button @click="onClickClearTempImg()" style="margin-left:10px">清空</el-button>
                </div>

                <div class="temp-img">
                    <!-- <img v-for="(imgSrc,index) in tempImgList" :key="index" :src="imgSrc" style="margin:0"/> -->
                    <img :src="tempImgUrl"/>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_qr">
                <template #label>
                    <span class="custom-tabs-label">
                        <span>二维码</span>
                    </span>
                </template>
                <div class="vue-ctrl">
                    <div class="hint">二维码获取方式：</div>
                    <el-select v-model="qrType">
                        <el-option v-for="item in qrTypeOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <div class="hint">二维码质量：</div>
                    <el-select v-model="qrLevel">
                        <el-option v-for="item in qrLevelOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <div class="hint">二维码大小：</div>
                    <el-input-number v-model="qrSize" :min="32" :max="1000000" size="small" style="max-height: 35px;" />
                </div>
                <div class="vue-ctrl">
                    <div class="hint">二维码内容：</div>
                    <el-input style="width:620px" v-model="qrContent" placeholder="请输入要生成的二维码内容" />
                    <el-button @click="onClickCreateQr()">生成二维码</el-button>
                </div>
                <div class="temp-img" v-cloak>
                    <img :src="tempQrUrl" class="qr-img" />
                </div>
            </el-tab-pane>
        </el-tabs>

        <dialog-customer-edit ref="dialogCustomerEditRef" @onEditEnd="customerOnEditEnd" />
    </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, ComponentInternalInstance } from "vue";
import DialogCustomerEdit from '@/view/dialog/CustomerEdit.vue'//客户信息编辑弹窗
import ModalTool from "@/common/ui/ModalTool";

const activeName = ref("ex_list")
const { proxy } = getCurrentInstance() as ComponentInternalInstance


//#region 服务管理
const port = ref(8092) //端口号
async function onClickAutoPort() {
    ModalTool.ShowLoading("请稍等...")
    const checkRes = await window.EPre.localExeCheckStart()
    if (checkRes.code == 0) {
        ModalTool.HideLoading()
        ModalTool.ShowDialogWarn("提醒", "本地服务已启动，无法更改端口号!")
        return
    }
    const findRes = await window.EPre.localFindAvailablePort()
    ModalTool.HideLoading()
    if (findRes.code != 0) {
        ModalTool.ShowDialogWarn("提醒", "未发现可用端口号，请稍后重试!")
        return
    }
    ModalTool.ShowDialogSuccess("提醒", `可用端口号为:${findRes.data.port}`)
    port.value = findRes.data.port
}
async function onClickLocalServerStart() {
    ModalTool.ShowLoading("正在启动服务...")
    proxy?.$APILOCAL.setLocalPort(port.value + "")
    const startRes = await window.EPre.localExeStart({ port: port.value })
    ModalTool.HideLoading()
    if (startRes.code != 0) {
        ModalTool.ShowDialogWarn("提醒", startRes.message)
    } else {
        ModalTool.ShowDialogSuccess("提醒", "本地服务启动成功!")
    }
}
async function onClickLocalServerStop() {
    const stopRes = await window.EPre.localExeStop({})
    ModalTool.ShowToast(stopRes.message, "info")
    if (stopRes.code == 0) {
        customerList.value = []
    }
}
//#endregion 

//#region 列表API
const dialogCustomerEditRef = ref<InstanceType<typeof DialogCustomerEdit>>();
const customerList = ref(new Array())
const query = ref("")
async function onClickGetList() {
    let queryApi = null
    if (query.value == undefined || query.value == null || query.value.length == 0) {
        queryApi = proxy?.$APILOCAL.customerList()
    } else {
        queryApi = proxy?.$APILOCAL.customerQuery(query.value)
    }
    const queryRes = await queryApi.exec()
    console.log("数据结果", queryRes)
    if (queryRes.isFail) {
        ModalTool.ShowDialog("提醒", queryRes.message)
        return
    }
    customerList.value = queryRes.body.data
}
function onClickAdd() {
    dialogCustomerEditRef.value?.open({})
}
function onClickEdit(customerItem: any) {
    dialogCustomerEditRef.value?.open(customerItem)
}
function onClickDelete(customerItem: any) {
    ModalTool.ShowAsk("提醒", "您确定要删除这条记录吗?", () => {
        runDelete(customerItem.id)
    })
}
async function runDelete(id: string) {
    const delRes = await proxy?.$APILOCAL.customerDelete(id).exec()
    if (delRes.isFail) {
        ModalTool.ShowDialog("提醒", delRes.message)
        return
    }
    ModalTool.ShowToast("操作成功", "success")
    onClickGetList()
}
function customerOnEditEnd(event) {
    console.log("customerOnEditEnd", event)
    onClickGetList()
}
function onClickOpenWindowByUrl(url) {
    window.EPre.openChildWin("...", url)
}
//#endregion

//#region 随机图片
const imgType = ref("base64")
const imgTypeOptions = ref([{
    value: 'base64',
    label: 'Base64',
}, {
    value: 'blob',
    label: '二进制文件对象',
}, {
    value: 'url',
    label: 'URL地址访问',
}])
const tempImgList=ref(new Array<any>())
const tempImgUrl = ref("")
const imgw = ref(64)
const imgh = ref(64)
const refreshFlag = ref(false) //true：允许自动刷新；false:不允许
const refershCount = ref(0)
function onClickStartRefreshImg() {
    if (refreshFlag.value) {//若已经允许了，就不可以点击此按钮
        return
    }
    tempImgList.value=[]
    refreshFlag.value = true
    refershCount.value = 0
    delayRefreshImg()
    setTimeout(() => {
        refreshFlag.value = false
    }, 10000)
    // refreshImg()
}
function refreshImg() {
    return new Promise(async (resolve, __) => {
        if (imgType.value == "base64") {
            const refreshRes = await proxy?.$APILOCAL.imageRandom(imgw.value, imgh.value).exec()
            ModalTool.HideLoading()
            if (refreshRes.isFail) {
                return
            }
            tempImgUrl.value = `Data:image/jpg;base64,${refreshRes.body.data}`
            // tempImgList.value.push(`Data:image/jpg;base64,${refreshRes.body.data}`)
        } else if (imgType.value == "blob") {
            const res = await proxy?.$APILOCAL.imageRandomBlob(imgw.value, imgh.value)
            tempImgUrl.value = window.URL.createObjectURL(res.data)
            // tempImgList.value.push(window.URL.createObjectURL(res.data))
        } else if (imgType.value == "url") {//这种方式，频繁访问是有问题的
            const imgUrl = proxy?.$APILOCAL.imageRandomUrl(imgw.value, imgh.value)
            tempImgUrl.value = imgUrl
            // tempImgList.value.push(imgUrl)
        }
        resolve({})
    })
}

function delayRefreshImg() {
    //每隔20毫秒执行一次
    if (refreshFlag.value) {
        setTimeout(async () => {
            await refreshImg()
            refershCount.value++
            delayRefreshImg()
        }, 0)
    }
}
function onClickStopRefreshImg() {
    refreshFlag.value = false
}
function onClickClearTempImg(){
    tempImgList.value=[]
}
//#endregion

//#region 二维码
const qrType = ref("base64")
const qrSize = ref(256)
const qrLevel = ref("M")
const qrContent = ref("")
const tempQrUrl = ref("")
const qrTypeOptions = ref([{
    value: 'base64',
    label: 'Base64',
}, {
    value: 'url',
    label: 'URL地址访问',
}])
const qrLevelOptions = ref([{
    value: 'L',
    label: '低质量(L)',
}, {
    value: 'M',
    label: '中等质量(M)',
}, {
    value: 'Q',
    label: '高质量(Q)',
}, {
    value: 'H',
    label: '超高质量(H)',
}])
async function onClickCreateQr() {
    if (qrType.value == "base64") {
        const qrRes = await proxy?.$APILOCAL.getQr(qrContent.value, qrLevel.value, qrSize.value).exec()
        if (qrRes.isFail) {
            ModalTool.ShowDialogWarn("提醒", qrRes.message)
            return
        }
        tempQrUrl.value = `Data:image/jpg;base64,${qrRes.body.data}`
    } else {
        tempQrUrl.value = proxy?.$APILOCAL.getQrUrl(qrContent.value, qrLevel.value, qrSize.value)
    }
}
//#endregion
</script>

<style lang="scss">
.vue-page {
    width: 100%;
    display: flex;
    flex-direction: column;

    .vue-ctrl {
        display: flex;
        flex-direction: row;
        height: 55px;
        align-items: center;
        padding: 5px;
        border-bottom: 1px solid rgb(175, 180, 180);
        margin-bottom: 5px;

        .hint {
            margin-right: 10px;
            font-size: 14px;
        }
    }

    .query {
        width: 220px;
        margin-right: 10px;
    }
}

.ctrl {
    display: flex;
}

.temp-img {
    border: 1px solid rgb(137, 132, 132);
    border-radius: 10px;
    width: 95%;
    height: 820px;
    overflow: auto;
    padding: 5px;
    flex-wrap: wrap;
    flex-direction: row;
    /*子元素之间取消空白间隙，并把项目放在容器顶部。*/
    align-content: flex-start;    
}

.qr-img {
    border: 1px solid #aba8a8;
    border-radius: 10px;
}

</style>