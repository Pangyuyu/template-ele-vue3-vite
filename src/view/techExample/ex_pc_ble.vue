<template>
    <div class="vue-page">
        <div class="bar">
            <el-button type="primary" @click="onClickBleScaning">搜索蓝牙</el-button>
        </div>
        <el-table :data="deviceList" border height="720" style="width:100%;">
            <el-table-column prop="deviceId" label="deviceId" />
            <el-table-column prop="deviceName" label="deviceName" />
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
        console.log("设备列表",res)
        if (res.code != 0) {
            return
        }
        for(let i=0;i<res.data.length;i++){
            const item=res.data[i]
             const index = deviceList.value.findIndex(dev => {
                return dev.deviceId == item.deviceId
            })
            if (index == -1) {
                deviceList.value.push({
                    ...item
                })
            }
        }
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