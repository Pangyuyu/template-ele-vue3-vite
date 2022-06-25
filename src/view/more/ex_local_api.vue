<template>
    <div class="vue-page">
        <div class="vue-ctrl">
            <div style="margin-right:10px">本地服务:</div>
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
                    <div class="item">3.服务地址:http://localhost:8091</div>
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
                    <div class="hint">图片宽度：</div>
                    <el-input-number v-model="imgw" :min="1" :max="1000000" size="small" style="max-height: 35px;" />
                    <div class="hint">图片高度：</div>
                    <el-input-number v-model="imgh" :min="1" :max="1000000" size="small" loading="lazy"/>
                    <el-button @click="onClickStartRefreshImg()" style="margin-left: 10px;" :disabled="refreshFlag">开始刷新图片</el-button>
                    <el-button @click="onClickStopRefreshImg()" style="margin-left: 10px;" :disabled="!refreshFlag">停止刷新图片</el-button>
                </div>

                <div class="temp-img"  v-cloak>
                    <img :src="tempImgUrl"/>
                    <div>{{refershCount}}</div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <dialog-customer-edit ref="dialogCustomerEditRef" @onEditEnd="customerOnEditEnd" />
    </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, ComponentInternalInstance, onMounted } from "vue";
import DialogCustomerEdit from '@/view/dialog/CustomerEdit.vue'//客户信息编辑弹窗
import ModalTool from "@/common/ui/ModalTool";
const dialogCustomerEditRef = ref<InstanceType<typeof DialogCustomerEdit>>();
const activeName = ref("ex_list")
const customerList = ref(new Array())
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const query = ref("")

onMounted(() => {
    // onClickGetList()
})
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
    dialogCustomerEditRef.value.open({})
}
function onClickEdit(customerItem: any) {
    dialogCustomerEditRef.value.open(customerItem)
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
async function onClickLocalServerStart() {
    ModalTool.ShowLoading("正在启动服务...")
    const startRes = await window.EPre.localExeStart({})
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
function onClickOpenWindowByUrl(url) {
    window.EPre.openChildWin("...", url)
}

const tempImgUrl = ref("")
const imgw = ref(200)
const imgh = ref(200)
const refreshFlag = ref(false) //true：允许自动刷新；false:不允许
const refershCount=ref(0)
function onClickStartRefreshImg() {
    if (refreshFlag.value) {//若已经允许了，就不可以点击此按钮
        return
    }
    refreshFlag.value = true
    refershCount.value=0
    delayRefreshImg()
}
async function refreshImg() {
    const refreshRes = await proxy?.$APILOCAL.imageRandomColor(imgw.value, imgh.value).exec()
    ModalTool.HideLoading()
    if (refreshRes.isFail) {
        return
    }
    refershCount.value++
    tempImgUrl.value = `Data:image/jpg;base64,${refreshRes.body.data}`
    delayRefreshImg()
}

function delayRefreshImg() {
    //每隔20毫秒执行一次
    if (refreshFlag.value) {
        setTimeout(() => {
            refreshImg()
        }, 0)
    }

}
function onClickStopRefreshImg() {
    refreshFlag.value = false
}
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
    // display: flex;
    // justify-content: center;
    // align-items: center;
    width: 95%;
    height: 820px;
    overflow: auto;
    padding: 5px;
}
</style>