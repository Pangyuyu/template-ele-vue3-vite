<template>
    <div class="vue-page">
        <el-tabs v-model="activeName" class="xing-tabs" type="card" style="flex-grow:1">
            <el-tab-pane name="ex_canvas_rect">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_canvas_rect')">绘制矩形</span>
                    </span>
                </template>
                <div class="panel-content gradient-content">
                    <div class="img-outer alpha-background-image">
                        <canvas id="ex_ctx_rect" class="canvas-content" :width="formDataRect.width"
                            :height="formDataRect.height"></canvas>
                    </div>
                    <div class="img-setting">
                        <el-form :model="formDataRect" label-width="120px" label-position="top">
                            <el-form-item label="大小">
                                <div>
                                    <label>宽:</label>
                                    <el-input-number v-model="formDataRect.width" :min="10" :max="4096" />
                                    <label>高:</label>
                                    <el-input-number v-model="formDataRect.height" :min="10" :max="4096" />
                                </div>
                            </el-form-item>
                            <el-table :data="formDataRect.draws" border height="480">
                                <el-table-column label="启用" width="55">
                                    <template #default="scoped">
                                        <el-checkbox v-model="scoped.row.enable" size="small" />
                                    </template>
                                </el-table-column>
                                <el-table-column label="绘制" width="90">
                                    <template #default="scoped">
                                        <el-select v-model="scoped.row.ctrl" size="small">
                                            <el-option v-for="item in rectCtrlOptions" :key="item.value"
                                                :label="item.label" :value="item.value" />
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column label="位置" width="160">
                                    <template #default="scoped">
                                        <div class="clm-number">
                                            <div class="row">
                                                <label>x:</label>
                                                <el-input-number v-model="scoped.row.x" :min="0" :max="4096"
                                                    size="small" controls-position="right" />
                                            </div>
                                            <div class="row">
                                                <label>y:</label>
                                                <el-input-number v-model="scoped.row.y" :min="0" :max="4096"
                                                    size="small" controls-position="right" />
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="大小" width="160">
                                    <template #default="scoped">
                                        <div class="clm-number">
                                            <div class="row">
                                                <label>宽:</label>
                                                <el-input-number v-model="scoped.row.w" :min="0" :max="4096"
                                                    size="small" controls-position="right" />
                                            </div>
                                            <div class="row">
                                                <label>高:</label>
                                                <el-input-number v-model="scoped.row.h" :min="0" :max="4096"
                                                    size="small" controls-position="right" />
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="颜色">
                                    <template #default="scoped">
                                        <el-color-picker v-model="scoped.row.color" show-alpha
                                            :predefine="predefineColors" />
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-form-item>
                                <label class="clear-ctx">
                                    <el-checkbox v-model="formDataRect.clearCtx" size="small" /> 绘制之前清空画布
                                </label>
                                <el-button type="primary" style="width:200px" @click="onClickDrawCanvas()">绘制Canvas
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="panel-warn">
                    <div class="item">1.详情查看<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API')">Canvas</a>
                    </div>
                    <div class="item">2.<a href="javascript:void(0)"
                            @click="onClickOpenWindowByUrl('https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial')">Canvas
                            教程</a>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_canvas_path">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_canvas_path')">绘制路径</span>
                    </span>
                </template>
                <div class="panel-content gradient-content">
                    <div class="img-outer alpha-background-image">
                        <canvas id="ex_ctx_path" class="canvas-content" :width="formDataPath.width"
                            :height="formDataPath.height"></canvas>
                    </div>
                    <div class="img-setting">
                        <el-form :model="formDataPath" label-width="120px" label-position="top">
                            <el-form-item label="大小">
                                <div>
                                    <label>宽:</label>
                                    <el-input-number v-model="formDataRect.width" :min="10" :max="4096" />
                                    <label>高:</label>
                                    <el-input-number v-model="formDataRect.height" :min="10" :max="4096" />
                                </div>
                            </el-form-item>
                        </el-form>
                        <div class="path_ctrl">
                            <el-button type="primary" style="width:200px" @click="onClickDrawLinesFill()">绘制线段(填充)
                            </el-button>
                            <el-button type="primary" style="width:200px" @click="onClickDrawLinesStroke()">绘制线段(描边)
                            </el-button>
                        </div>
                        <div class="path_ctrl">
                            <el-button type="primary" style="width:200px" @click="onClickDrawArcFill()">绘制圆弧(填充)
                            </el-button>
                            <el-button type="primary" style="width:200px" @click="onClickDrawArcStroke()">绘制圆弧(描边)
                            </el-button>
                        </div>
                        <div class="path_ctrl">
                            <el-button type="danger" style="width:200px" @click="onClickCanvasClear('ex_ctx_path')">清空画布
                            </el-button>
                        </div>

                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import ModalTool from '@/common/ui/ModalTool';
import { ref, onMounted } from 'vue'
import CanvasTools, { XDrawLines, XPoint, XDrawArc } from './canvasTools'
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
onMounted(() => {
    onClickDrawCanvas()
})
//#region tab
const activeName = ref("ex_canvas_rect")
function getPanelLabelClass(lableName: string) {
    if (activeName.value == lableName) {
        return 'panel-active'
    }
    return 'system-text'
}
function onClickOpenWindowByUrl(url: string) {
    window.EPre.openChildWin("...", url)
}
function onClickCanvasClear(canvasId: string) {
    let ctx = CanvasTools.getCanvasCtx(canvasId)
    if (ctx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    let w = 0, h = 0
    if (activeName.value == 'ex_canvas_rect') {
        w = formDataRect.value.width
        h = formDataRect.value.height
    } else if (activeName.value == "ex_canvas_path") {
        w = formDataPath.value.width
        h = formDataPath.value.height
    }
    ctx.clearRect(0, 0, w, h)
}
//#endregion

//#region 绘制矩形
let exRectCtx: CanvasRenderingContext2D | null = null
const rectCtrlOptions = ref([
    {
        value: "fillRect",
        label: "矩形"
    },
    {
        value: "strokeRect",
        label: "边框"
    },
    {
        value: "clearRect",
        label: "清除"
    }
])
const formDataRect = ref({
    width: 500,
    height: 500,
    clearCtx: true,
    draws: [
        {
            enable: true,
            ctrl: 'fillRect',
            x: 50,
            y: 50,
            w: 100,
            h: 100,
            color: 'rgba(243, 7, 7, 0.5)'
        },
        {
            enable: true,
            ctrl: 'strokeRect',
            x: 50,
            y: 50,
            w: 100,
            h: 100,
            color: 'rgba(30, 144, 255, 1)'
        },
        {
            enable: true,
            ctrl: 'fillRect',
            x: 75,
            y: 75,
            w: 50,
            h: 50,
            color: 'rgba(12, 248, 43, 0.5)'
        },
        {
            enable: true,
            ctrl: 'fillRect',
            x: 250,
            y: 250,
            w: 100,
            h: 100,
            color: 'rgba(192, 215, 57, 0.5)'
        },
        {
            enable: false,
            ctrl: 'fillRect',
            x: 300,
            y: 300,
            w: 100,
            h: 100,
            color: '#000000'
        },
        {
            enable: false,
            ctrl: 'fillRect',
            x: 70,
            y: 70,
            w: 100,
            h: 100,
            color: '#000000'
        }
    ]
})
function onClickDrawCanvas() {
    if (exRectCtx == null) {
        exRectCtx = CanvasTools.getCanvasCtx("ex_ctx_rect")
    }
    if (exRectCtx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    if (formDataRect.value.clearCtx) {
        exRectCtx?.clearRect(0, 0, formDataRect.value.width, formDataRect.value.height)
    }
    formDataRect.value.draws.forEach(item => {
        if (item.enable) {
            if (item.ctrl == "fillRect") {
                /*这个地方若直接写:exRectCtx?.fillStyle=item.color,会提醒“赋值表达式的左侧不能是可选属性访问。ts(2779)”
                加上改为 "!",它其实是not null 的断言操作符，不执行运行时检查，告诉编译器只需要知道这个东西
                */
                exRectCtx!.fillStyle = item.color
                exRectCtx?.fillRect(item.x, item.y, item.w, item.h)
            } else if (item.ctrl == "strokeRect") {
                exRectCtx!.strokeStyle = item.color
                exRectCtx?.strokeRect(item.x, item.y, item.w, item.h)
            } else if (item.ctrl == "clearRect") {
                exRectCtx?.clearRect(item.x, item.y, item.w, item.h)
            }
        }

    })
    console.log("绘制信息", formDataRect.value)
}
//#endregion

//#region 绘制路径
const formDataPath = ref({
    width: 500,
    height: 500
})
//moveTo(x,y) 移动

//lineTo(x,y) 直线
//arc() //圆弧 (圆弧中心位置、半径长度、开始弧度、结束弧度、是否逆时针)
//quadraticCurveTo(cp1x, cp1y, x, y) 绘制二次贝塞尔曲线，cp1x,cp1y 为一个控制点，x,y 为结束点。
//bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) 绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
//rect(x, y, width, height) 绘制一个左上角坐标为（x,y），宽高为 width 以及 height 的矩形。

//closePath() 闭合
//stroke() 描边
//fill //填充
function onClickDrawLinesFill() {
    let ctx = CanvasTools.getCanvasCtx("ex_ctx_path")
    if (ctx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    let xDrawLines = new XDrawLines(ctx)
        .withStart(new XPoint(25, 25))
        .addPoint(new XPoint(105, 25))
        .addPoint(new XPoint(25, 105))
        .withEndMode('fill')
    xDrawLines.draw()
}
function onClickDrawLinesStroke() {
    let ctx = CanvasTools.getCanvasCtx("ex_ctx_path")
    if (ctx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    let xDrawLines = new XDrawLines(ctx)
        .withStart(new XPoint(125, 125))
        .addPoint(new XPoint(125, 45))
        .addPoint(new XPoint(45, 125))
        .withEndMode('stroke')
    xDrawLines.draw()
}
function onClickDrawArcFill() {
    let ctx = CanvasTools.getCanvasCtx("ex_ctx_path")
    if (ctx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    let xDrawArc = new XDrawArc(ctx)
        .withCenterPoint(new XPoint(50, 200))
        .withRadius(50)
        .withStartAngle(0)
        .withEndAngle(90)
        .withAnticlockwise(false)
        .withEndMode("fill")
    xDrawArc.draw()
}
function onClickDrawArcStroke() {
    let ctx = CanvasTools.getCanvasCtx("ex_ctx_path")
    if (ctx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    let xDrawArc = new XDrawArc(ctx)
        .withCenterPoint(new XPoint(200, 200))
        .withRadius(50)
        .withStartAngle(100)
        .withEndAngle(145)
        .withAnticlockwise(true)
        .withEndMode("stroke")
    xDrawArc.draw()
}
//#endregion
</script>

<style lang="scss" scoped>
.gradient-content {
    display: flex;
    flex-direction: row;
    min-height: 620px;
    border: 1px solid #ada9a9;

    .img-setting {
        width: 580px;
        border-left: 1px solid #ada9a9;
        min-height: 580px;
        display: flex;
        flex-direction: column;
        padding: 5px;
    }

    .img-outer {
        flex-grow: 1;
        min-height: 620px;
        max-height: 620px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow-y: auto;
        overflow-x: auto;
        padding: 10px;

        .img-content {
            width: 500px;
            height: 500px;
            border: 1px solid #c1c0c0;
            border-radius: 10px;
            margin-top: 10px;
            // border-radius: 300px;
        }

        .canvas-content {
            border: 1px solid #c1c0c0;
            border-radius: 10px;
            margin-top: 10px;
        }

        .img-style {
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        }
    }
}

.clm-number {
    display: flex;
    flex-direction: column;

    .row {
        display: flex;
    }
}

.clear-ctx {
    color: #6174f5;
    font-size: 16px;
    margin-left: 10px;
    margin-right: 10px;
}

.alpha-background-image {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDkzNzZFN0RDODhFMTFFOEExOUJFNkQ0MTNFM0Q2OTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDkzNzZFN0VDODhFMTFFOEExOUJFNkQ0MTNFM0Q2OTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOTM3NkU3QkM4OEUxMUU4QTE5QkU2RDQxM0UzRDY5NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEOTM3NkU3Q0M4OEUxMUU4QTE5QkU2RDQxM0UzRDY5NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PktroGEAAAAoSURBVHjaYvz06RMDDPDy8sLZTAw4AOkSjP///4dzPn/+TAs7AAIMAG56COJosoI3AAAAAElFTkSuQmCC);
}

.path_ctrl {
    margin-bottom: 5px;
}
</style>