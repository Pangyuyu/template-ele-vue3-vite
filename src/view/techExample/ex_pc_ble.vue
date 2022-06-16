<template>
    <div class="vue-page">
        <div class="bar">
            <el-button type="primary" @click="onClickBleScaning">搜索蓝牙</el-button>
            <el-button type="primary" @click="onClickScan">搜索蓝牙-V2</el-button>
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
        <div class="panel-warn">
            <div class="item">1.noble方案：需要替换驱动，放弃；</div>
            <div class="item">2.node-ble方案：不兼容windows;</div>
            <div class="item">3.navigator.bluetooth.requestDevice方案：功能受限；</div>
        </div>
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
    window.EPre.bleOnScanning((_event: any, res: any) => {
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
    // console.log("onClickBleTest", deviceItem)
    // ModalTool.ShowLoading("...")
    // await window.EPre.bleSetSearchDeviceId({ deviceId: deviceItem.deviceId })
    // navigator.bluetooth.requestDevice({
    //     acceptAllDevices: true,
    // }).then((device) => {
    //     console.log("搜索结果",device)
    //     device.addEventListener('advertisementreceived', (event) => {
    //         console.log('Advertisement received.');
    //         console.log('  Device Name: ' + event.device.name);
    //         console.log('  Device ID: ' + event.device.id);
    //         console.log('  RSSI: ' + event.rssi);
    //         console.log('  TX Power: ' + event.txPower);
    //         console.log('  UUIDs: ' + event.uuids);
    //         event.manufacturerData.forEach((valueDataView, key) => {
    //             logDataView('Manufacturer', key, valueDataView);
    //         });
    //         event.serviceData.forEach((valueDataView, key) => {
    //             logDataView('Service', key, valueDataView);
    //         });
    //     });
    //     console.log('Watching advertisements from "' + device.name + '"...');
    //     return device.watchAdvertisements();
    // }).catch((error) => {
    //     ModalTool.HideLoading()
    //     console.log('Argh! ' + error);
    // });
}
async function onClickScan() {
    try {
        //卧槽：Only Android and macOS support the Scanning API.来自：https://github.com/WebBluetoothCG/web-bluetooth/issues/483
        const scan = await navigator.bluetooth.requestLEScan({
            acceptAllAdvertisements: true
        });

        log('Scan started with:', scan);
        log(' acceptAllAdvertisements: ' + scan.acceptAllAdvertisements);
        log(' active: ' + scan.active);
        log(' keepRepeatedDevices: ' + scan.keepRepeatedDevices);
        log(' filters: ' + JSON.stringify(scan.filters));

        navigator.bluetooth.addEventListener('advertisementreceived', event => {
            log('Advertisement received.');
            log('  Device Name: ' + event.device.name);
            log('  Device ID: ' + event.device.id);
            log('  RSSI: ' + event.rssi);
            log('  TX Power: ' + event.txPower);
            log('  UUIDs: ' + event.uuids);
            event.manufacturerData.forEach((valueDataView, key) => {
                logDataView('Manufacturer', key, valueDataView);
            });
            event.serviceData.forEach((valueDataView, key) => {
                logDataView('Service', key, valueDataView);
            });
        });

        setTimeout(stopScan, 10000);
        function stopScan() {
            log('Stopping scan...');
            scan.stop();
            log('Stopped.  scan.active = ' + scan.active);
        }
    } catch (error) {
        log('Argh! ' + error);
    }
}
const logDataView = (labelOfDataSource, key, valueDataView) => {
    const hexString = [...new Uint8Array(valueDataView.buffer)].map(b => {
        return b.toString(16).padStart(2, '0');
    }).join(' ');
    const textDecoder = new TextDecoder('ascii');
    const asciiString = textDecoder.decode(valueDataView.buffer);
    log(`  ${labelOfDataSource} Data: ` + key +
        '\n    (Hex) ' + hexString +
        '\n    (ASCII) ' + asciiString);
};
function log(message?: any, ...optionalParams: any[]) {
    console.log(message, optionalParams)
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