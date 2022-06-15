<template>
    <div class="vue-page">
        <div class="bar">
            <el-button type="primary" @click="onClickBleScaning">搜索蓝牙</el-button>
        </div>
        <el-table :data="deviceList" border height="720" style="width:100%;">
            <el-table-column prop="deviceId" label="deviceId" width="220" />
            <el-table-column prop="deviceName" label="deviceName" width="320" />
            <el-table-column label="操作">
                <template #default="scoped">
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { ref, getCurrentInstance, ComponentInternalInstance, onMounted } from "vue";
import ModalTool from '@/common/ui/ModalTool'
const deviceList = ref(new Array())
onMounted(() => {
    watchBleScaning()
})
function watchBleScaning() {
    window.EleApi.bleOnScanning((_event, res) => {
        console.log("设备列表", res)
        const findItems=res.data
        findItems.forEach(item => {
            const findItem = deviceList.value.find(dev => {
                return dev.deviceId === item.deviceId
            })
            if (findItem) {
                findItem.deviceName = item.deviceName
            } else {
                deviceList.value.push({
                    ...item
                })
            }
        });
    })
}
async function onClickBleScaning() {
    ModalTool.ShowLoading("...")
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true
    }).then(function (device) {
        ModalTool.HideLoading()
        console.log('名称: ' + device);
    }).catch(function (error) {
        console.log(error);
        ModalTool.HideLoading()
    });
}
</script>

<style lang="scss">
.vue-page {
    width: 100%;
    display: flex;
    flex-direction: column;

    .bar {
        height: 55px;
        border-bottom: 1px solid #dddddd;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
}
</style>