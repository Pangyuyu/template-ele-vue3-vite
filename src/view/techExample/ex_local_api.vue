<template>
    <div class="vue-page">
        <div class="vue-ctrl">
            <el-button  type="primary" @click="onClickGetList()">获取客户信息</el-button>
        </div>
        <el-table :data="customerList" border height="720" style="width:100%;">
            <el-table-column prop="id" label="id"/>
            <el-table-column prop="name" label="名称"/>
            <el-table-column prop="address" label="地址"/>
            <el-table-column prop="phone" label="手机号"/>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { ref, getCurrentInstance, ComponentInternalInstance } from "vue";
const customerList = ref(new Array())
const { proxy } = getCurrentInstance() as ComponentInternalInstance
async function onClickGetList(){
    const res=await proxy.$APILOCAL.getCustomerList().exec()
    console.log("数据结果",res)
    if(res.isFail){
        console.warn("接口访问失败",res)
        return
    }
    customerList.value=res.body.data
}
</script>

<style lang="scss">
.vue-page {
    width: 100%;
    display: flex;
    flex-direction: column;
    .vue-ctrl{
        display: flex;
        flex-direction: row;
        height: 85px;
        align-items: center;
        padding: 5px;
    }
}
</style>