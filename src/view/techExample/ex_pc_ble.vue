<template>
    <div class="vue-page">
        <div class="bar">
            <el-button type="primary" @click="onClickBleScaning">搜索蓝牙</el-button>
        </div>
        <el-table :data="deviceList" border height="720" style="width:100%;">
            <el-table-column type="index" width="100" />
            <el-table-column prop="deviceName" label="deviceName" width="320" sortable />
            <el-table-column prop="deviceId" label="deviceId" width="220" />
            <el-table-column label="操作">
                <template #default="scoped">
                    <div class="device-ctrl">
                        <el-button type="primary" @click="onClickBleTest(scoped.row)">测试</el-button>
                    </div>
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
    window.EleApi.bleOnScanning((_event: any, res: any) => {
        const findItems = res.data
        let noList = []
        for (let i = 0; i < findItems.length; i++) {
            const findItem = findItems[i]
            const theItem = deviceList.value.find(dev => {
                return dev.deviceId === findItem.deviceId
            })
            if (theItem) {
                theItem.deviceName = findItem.deviceName
            } else {
                noList.push({
                    ...findItem
                })
            }
        }
        if (noList.length > 0) {
            deviceList.value.push(...noList)
        }
    })
}
async function onClickBleScaning() {
    ModalTool.ShowLoading("搜索中")
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        // optionalServices: ['battery_service']
    }).then(function (device) {
        ModalTool.HideLoading()
        console.log('名称: ' + device);
    }).catch(function (error) {
        console.log(error);
        ModalTool.HideLoading()
    });
}
async function onClickBleTest(deviceItem) {
    console.log("onClickBleTest", deviceItem)
    ModalTool.ShowLoading("...")
    await window.EleApi.bleSetSearchDeviceId({ deviceId: deviceItem.deviceId })
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
    }).then((res) => {
        ModalTool.HideLoading()
        console.log('搜索结果', res);
    }).catch((err) => {
        ModalTool.HideLoading()
        console.log(err);        
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

.device-ctrl {
    display: flex;
    flex-direction: row;
}
</style>