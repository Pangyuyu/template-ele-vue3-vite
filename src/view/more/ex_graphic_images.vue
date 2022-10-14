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
                    <div class="img-outer alpha-background-image">
                        <div class="img-content" :style="linearStyle"></div>
                        <div class="img-style">{{linearStyle}}</div>
                    </div>
                    <div class="img-setting">
                        <el-form :model="formDataLinear" label-width="120px" label-position="top">
                            <el-form-item label="渐变方向">
                                <div>
                                    <el-input-number v-model="formDataLinear.angle" :min="0" :max="360" />
                                    <div class="angle-hint">top:0deg;bottom:180deg;left:270deg;right:90deg;</div>
                                </div>

                            </el-form-item>
                            <el-form-item label="渐变颜色">
                                <el-table :data="formDataLinear.colorStopList" border height="320" width="520">
                                    <el-table-column label="启用" width="60">
                                        <template #default="scoped">
                                            <el-checkbox v-model="scoped.row.enable" size="small" />
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="颜色" width="90">
                                        <template #default="scoped">
                                            <color-picker v-model:pureColor="scoped.row.color"
                                                v-model:gradientColor="pikcerGradientColor" />
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
                                <el-button type="primary" style="width:200px" @click="onClickSetLinearStyle()">设置
                                </el-button>
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
                <div class="panel-content gradient-content">
                    <div class="img-outer alpha-background-image">
                        <div class="img-content" :style="radialStyle"></div>
                        <div class="img-style">{{radialStyle}}</div>
                    </div>
                    <div class="img-setting">
                        <el-form :model="formDataRadial" label-width="120px" label-position="top">
                            <el-form-item label="渐变结束时的形状">
                                <el-radio-group v-model="formDataRadial.endingShape">
                                    <el-radio label="circle">圆形</el-radio>
                                    <el-radio label="ellipse">椭圆</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="渐变结束形状的大小">
                                <div>
                                    <el-select v-model="formDataRadial.endingSize" placeholder="选择位置" size="small">
                                        <el-option v-for="item in endingSizeOptions" :key="item.value"
                                            :label="item.label" :value="item.value" />
                                    </el-select>
                                    <div class="endingSize-hint">{{formDataRadial.endingSizeStr}}</div>
                                </div>
                            </el-form-item>
                            <el-form-item label="渐变位置">
                                <el-select v-model="formDataRadial.positon" placeholder="选择位置" size="small">
                                    <el-option v-for="item in postionOptions" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                                <el-input-number v-if="formDataRadial.positon=='percentage'" style="margin-left:10px"
                                    v-model="formDataRadial.positonPer" :min="1" :max="100" size="small" />
                            </el-form-item>

                            <el-form-item label="渐变颜色">
                                <el-table :data="formDataRadial.colorStopList" border height="280" width="520">
                                    <el-table-column label="启用" width="60">
                                        <template #default="scoped">
                                            <el-checkbox v-model="scoped.row.enable" size="small" />
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="颜色" width="90">
                                        <template #default="scoped">
                                            <color-picker v-model:pureColor="scoped.row.color"
                                                v-model:gradientColor="pikcerGradientColor" />
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
                                <el-button type="primary" style="width:200px" @click="onClickSetRaidalStyle()">设置
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>

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
                    待完善...
                </div>
                <div class="panel-warn">

                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ComponentInternalInstance, ref, onMounted, watch } from 'vue'
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
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
    onClickSetLinearStyle()
    onClickSetRaidalStyle()
})
const pikcerGradientColor = ref("linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)");
//#region 线性渐变
const linearStyle = ref("")
const formDataLinear = ref({
    sideOrCorner: "right",
    angle: 0,
    colorStopList: [
        {
            enable: true,
            color: 'rgb(5, 160, 69)',
            start: -1,
            end: -1
        },
        {
            enable: true,
            color: 'rgba(5, 160, 69, 0)',
            start: -1,
            end: -1
        },
        {
            enable: false,
            color: 'transparent',
            start: -1,
            end: -1
        },
        {
            enable: false,
            color: 'transparent',
            start: -1,
            end: -1
        },
        {
            enable: false,
            color: 'transparent',
            start: -1,
            end: -1
        }
    ]
})
function onClickSetLinearStyle() {
    let styleList = ["background: linear-gradient("]
    styleList.push(`${formDataLinear.value.angle}deg`)
    formDataLinear.value.colorStopList.map(item => {
        if (item.enable) {
            styleList.push(`,${item.color}`)
            if (item.start > -1) {
                styleList.push(` ${item.start}%`)
            }
            if (item.end > -1) {
                styleList.push(` ${item.end}%`)
            }
        }
    })
    styleList.push(");")
    linearStyle.value = styleList.join("")
    console.log("linearStyle.value", linearStyle.value)
}
//#endregion

//#region 径向渐变
const radialStyle = ref("")
const formDataRadial = ref({
    endingShape: "circle",
    positon: "percentage",
    positonPer: 30,
    endingSize: "closest-side",
    endingSizeStr: "",
    colorStopList: [
        {
            enable: true,
            color: 'rgb(5, 160, 69)',
            start: 10,
            end: 30
        },
        {
            enable: true,
            color: 'rgba(255, 171, 145, 0.44) ',
            start: 50,
            end: 60
        },
        {
            enable: true,
            color: 'rgba(241, 98, 126,0.6)',
            start: 80,
            end: -1
        }
    ]
})

const postionOptions = ref([
    {
        value: "center",
        label: "中心点"
    },
    {
        value: "top",
        label: "top"
    }, {
        value: "bottom",
        label: "bottom"
    }, {
        value: "left",
        label: "left"
    }, {
        value: "right",
        label: "right"
    }, {
        value: "percentage",
        label: "百分比"
    },
])
const endingSizeOptions = ref([
    {
        value: "default",
        label: "缺省值（最远角）",
        desc: "默认值"
    },
    {
        value: "closest-side",
        label: "closest-side",
        desc: "渐变结束的边缘形状与容器距离渐变中心点最近的一边相切（圆形）或者至少与距离渐变中心点最近的垂直和水平边相切（椭圆）。"
    },
    {
        value: "closest-corner",
        label: "closest-corner",
        desc: "渐变结束的边缘形状与容器距离渐变中心点最近的一个角相交。"
    },
    {
        value: "farthest-side",
        label: "farthest-side",
        desc: "与 closest-side 相反，边缘形状与容器距离渐变中心点最远的一边相切（或最远的垂直和水平边）。"
    },
    {
        value: "farthest-corner",
        label: "farthest-corner",
        desc: "渐变结束的边缘形状与容器距离渐变中心点最远的一个角相交。"
    }
])
watch(() => formDataRadial.value.endingSize, (value, oldValue) => {
    const sizeItem = endingSizeOptions.value.find(item => { return value == item.value })
    if (sizeItem) {
        formDataRadial.value.endingSizeStr = sizeItem.desc
    }
})
function onClickSetRaidalStyle() {
    console.log("formDataRadial.value", formDataRadial.value)
    let styleList = ["background: radial-gradient("]
    if (formDataRadial.value.endingShape)
        styleList.push(` ${formDataRadial.value.endingShape} `)
    if (formDataRadial.value.endingSize != "default") {
        styleList.push(` ${formDataRadial.value.endingSize} `)
    }
    if (formDataRadial.value.positon != "percentage") {
        styleList.push(` at ${formDataRadial.value.positon} `)
    } else {
        styleList.push(` at ${formDataRadial.value.positonPer}% `)
    }

    formDataRadial.value.colorStopList.map(item => {
        if (item.enable) {
            styleList.push(`,${item.color}`)
            if (item.start > -1) {
                styleList.push(` ${item.start}%`)
            }
            if (item.end > -1) {
                styleList.push(` ${item.end}%`)
            }
        }
    })
    styleList.push(");")
    radialStyle.value = styleList.join("")
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
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .img-content {
            width: 500px;
            height: 500px;
            border: 1px solid #c1c0c0;
            border-radius: 10px;
            margin-top: 10px;
            // border-radius: 300px;
        }


        .img-style {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        }

        // @keyframes turnZ {
        //     0% {
        //         transform: rotateZ(0deg);
        //     }

        //     100% {
        //         transform: rotateZ(360deg);
        //     }
        // }

        // .img-content:hover {
        //     animation-name: turnZ;
        //     animation-duration: 1s;
        //     animation-iteration-count: infinite;
        //     animation-fill-mode: forwards;
        //     animation-timing-function: linear;
        // }
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

.angle-hint {
    padding-left: 5px;
}

.alpha-background-image {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDkzNzZFN0RDODhFMTFFOEExOUJFNkQ0MTNFM0Q2OTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDkzNzZFN0VDODhFMTFFOEExOUJFNkQ0MTNFM0Q2OTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOTM3NkU3QkM4OEUxMUU4QTE5QkU2RDQxM0UzRDY5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOTM3NkU3Q0M4OEUxMUU4QTE5QkU2RDQxM0UzRDY5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PktroGEAAAAoSURBVHjaYvz06RMDDPDy8sLZTAw4AOkSjP///4dzPn/+TAs7AAIMAG56COJosoI3AAAAAElFTkSuQmCC);
}

.endingSize-hint {
    color: #6d6a6a;
    font-size: 12px;
    margin: 5px;
}
</style>