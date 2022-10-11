<template>
    <div class="vue-page">
        <el-tabs v-model="activeName" class="xing-tabs" type="card" style="flex-grow:1">
            <el-tab-pane name="ex_linear-gradient">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_linear-gradient')">线形渐变</span>
                    </span>
                </template>
                <div class="panel-content gradient-content">
                    <div class="img-outer">
                        <div class="img-content" :style="linear_style">

                        </div>
                    </div>
                    <div class="img-setting">
                        <el-form :model="formDataLinear" label-width="120px" label-position="top">
                            <!-- <el-form-item label="起始点位置">
                                <el-select v-model="formDataLinear.sideOrCorner" placeholder="起始点位置">
                                    <el-option label="left" value="left" />
                                    <el-option label="right" value="right" />
                                    <el-option label="top" value="top" />
                                    <el-option label="bottom" value="bottom" />
                                </el-select>
                            </el-form-item> -->
                            <!-- <el-form-item label="起始点垂直位置">
                                <el-select v-model="formDataLinear.sideOrCornerV" placeholder="起始点垂直位置">
                                    <el-option label="top" value="top" />
                                    <el-option label="bottom" value="bottom" />
                                </el-select>
                            </el-form-item> -->
                            <el-form-item label="渐变方向">
                                <el-input-number v-model="formDataLinear.angle" :min="0" :max="360" />
                                <div class="angle-hint">top:0deg;bottom:180deg;left:270deg;right:90deg;</div>
                            </el-form-item>
                            <el-form-item label="渐变颜色">
                                <el-table :data="formDataLinear.colorStopList" border height="420" width="520">
                                    <el-table-column label="启用" width="60">
                                        <template #default="scoped">
                                            <el-checkbox v-model="scoped.row.enable" size="small" />
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="颜色名称" width="160">
                                        <template #default="scoped">
                                            <div class="color-clm">
                                                <div class="color-hint" :style="{ background: scoped.row.color }"></div>
                                                <el-select v-model="scoped.row.color" placeholder="Select" size="small">
                                                    <el-option v-for="item in colorOptions" :key="item.value"
                                                        :label="item.label" :value="item.value"
                                                        :style="{'background-color': item.value}" />
                                                </el-select>
                                            </div>

                                        </template>
                                    </el-table-column>
                                    <el-table-column label="起始位置(%)" width="160">
                                        <template #default="scoped">
                                            <el-input-number v-model="scoped.row.start" :min="-1" :max="100"
                                                size="small" />
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="结束位置(%)" width="160">
                                        <template #default="scoped">
                                            <el-input-number v-model="scoped.row.end" :min="-1" :max="100"
                                                size="small" />
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" style="width:200px" @click="onClickSetLinearColor()">设置</el-button>
                            </el-form-item>
                        </el-form>
                        
                    </div>
                </div>
                <div class="panel-warn">
                    <div class="item">1.详情查看<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient')">linear-gradient()</a>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_radial-gradient">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_radial-gradient')">径向渐变</span>
                    </span>
                </template>
                <div class="panel-content">

                </div>
                <div class="panel-warn">
                    <div class="item">1.详情查看<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient')">radial-gradient()</a>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_canvas">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_canvas')">canvas</span>
                    </span>
                </template>
                <div class="panel-content">

                </div>
                <div class="panel-warn">

                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ComponentInternalInstance, ref, onMounted } from 'vue'
const activeName = ref("ex_linear-gradient")
function getPanelLabelClass(lableName: string) {
    if (activeName.value == lableName) {
        return 'panel-active'
    }
    return 'system-text'
}
function onClickOpenWindowByUrl(url: string) {
    window.EPre.openChildWin("...", url)
}
onMounted(() => {
    colorOptions.value = colorListStr.split(",").map(item => {
        return {
            value: item,
            label: item
        }
    })
    onClickSetLinearColor()
})
//#region 线性渐变 
//linear-gradient(red 0%, orange 10% 30%, yellow 50% 70%, green 90% 100%);
const linear_style = ref("")
const formDataLinear = ref({
    sideOrCorner:"right",
    // sideOrCornerH: "right",
    // sideOrCornerV: "bottom",
    angle: 0,
    colorStopList: [
        {
            enable:true,
            color: 'white',
            start: 0,
            end: -1
        },
        {
            enable:true,
            color: 'red',
            start: 30,
            end: -1
        },
        {
            enable:true,
            color: 'green',
            start: 50,
            end: -1
        },
        {
            enable:true,
            color: 'aqua',
            start: 70,
            end: -1
        },
        {
            enable:true,
            color: 'olive',
            start: 90,
            end: -1
        }
    ]
})
const colorListStr = "aqua,black,blue,fuchsia,gray,green,lime,maroon,navy,olive,purple,red,silver,teal,white,yellow"
const colorOptions = ref([])
function onClickSetLinearColor(){
    let styleList=["background: linear-gradient("]
    // styleList.push("to ")
    // styleList.push(` ${formDataLinear.value.sideOrCorner}`)
    // styleList.push(",")
    styleList.push(`${formDataLinear.value.angle}deg`)
    formDataLinear.value.colorStopList.map(item=>{
        if(item.enable){
            styleList.push(`,${item.color}`)
            if(item.start>-1){
                styleList.push(` ${item.start}%`)
            }
            if(item.end>-1){
                styleList.push(` ${item.end}%`)
            }
        }        
    })
    styleList.push(");")
    linear_style.value=styleList.join("")
    console.log("linear_style.value",linear_style.value)
}
//#endregion
</script>

<style lang="scss" scoped>
.vue-page {
    display: flex;
    flex-direction: column;
    height: 95%;
    padding: 5px;
}


.gradient-content {
    display: flex;
    flex-direction: row;
    min-height: 620px;
    border: 1px solid #ada9a9;

    .img-setting {
        width: 520px;
        border-left: 1px solid #ada9a9;
        min-height: 620px;
        display: flex;
        flex-direction: row;
        padding: 5px;
    }

    .img-outer {
        flex-grow: 1;
        min-height: 620px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .img-content {
            width: 600px;
            height: 600px;
            border: 1px solid #c1c0c0;
        }
    }
}

.color-clm {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .color-hint {
        min-width: 25px;
        min-height: 25px;
        max-width: 25px;
        max-height: 25px;
        margin-right: 5px;
        border: 1px solid #ada9a9;
    }
}
.angle-hint{
    padding-left: 5px;
}
</style>