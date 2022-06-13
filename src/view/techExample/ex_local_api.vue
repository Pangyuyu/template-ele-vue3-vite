<template>
    <div class="vue-page">
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
        <dialog-customer-edit ref="dialogCustomerEditRef" />
    </div>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, ComponentInternalInstance } from "vue";
import DialogCustomerEdit from '@/view/dialog/CustomerEdit.vue'
import ModalTool from "@/common/ui/ModalTool";
const dialogCustomerEditRef = ref<any>();

const customerList = ref(new Array())
const { proxy } = getCurrentInstance() as ComponentInternalInstance

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
    dialogCustomerEditRef.value?.open()
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
    console.log("delRes",delRes)
    if (delRes.isFail) {
        ModalTool.ShowDialog("提醒", delRes.message)
        return
    }
    ModalTool.ShowToast("操作成功")
    onClickGetList()
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
        height: 85px;
        align-items: center;
        padding: 5px;
    }

    .query {
        width: 220px;
        margin-right: 10px;
    }
}

.ctrl {
    display: flex;
}
</style>