<template>
    <div class="vue-page" style="overflow-y: hidden;">
        <el-tabs v-model="activeName" class="xing-tabs" type="card" style="flex-grow:1">
            <el-tab-pane name="ex_canvas_rect">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_canvas_rect')">绘制矩形</span>
                    </span>
                </template>
                <div class="panel-content gradient-content"  style="overflow-y: hidden;">
                    <div class="img-outer alpha-background-image">
                        <canvas id="ex_ctx_rect" class="canvas-content" :width="formDataRect.width"
                            :height="formDataRect.height"></canvas>
                    </div>
                    <div class="img-setting">
                        <el-form :model="formDataRect" label-width="120px" label-position="top">
                            <el-form-item label="大小">
                                <div class="clm-item">
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
                                <div class="clm-item">
                                    <div class="title">宽:</div>
                                    <el-input-number v-model="formDataRect.width" :min="10" :max="4096" />
                                    <div class="title">高:</div>
                                    <el-input-number v-model="formDataRect.height" :min="10" :max="4096" />
                                </div>
                            </el-form-item>
                        </el-form>
                        <div class="path_ctrl">
                            <label>颜色：</label>
                            <el-color-picker v-model="pathColor" show-alpha :predefine="predefineColors" />
                        </div>
                        <div class="path_ctrl">
                            <el-button type="primary" style="width:200px" @click="onClickDrawLinesStroke()">线段(描边)
                            </el-button>
                            <el-button type="primary" style="width:200px" @click="onClickDrawLinesFill()">线段(填充)
                            </el-button>
                        </div>
                        <div class="path_ctrl">
                            <el-button type="primary" style="width:200px" @click="onClickDrawArcStroke()">圆弧(描边)
                            </el-button>
                            <el-button type="primary" style="width:200px" @click="onClickDrawArcFill()">圆弧(填充)
                            </el-button>

                        </div>
                        <div class="path_ctrl">
                            <el-button type="primary" style="width:200px" @click="onClickDrawQuadraticStroke()">
                                二次贝塞尔曲线(描边)
                            </el-button>
                            <el-button type="primary" style="width:200px" @click="onClickDrawQuadraticFill()">
                                二次贝塞尔曲线(填充)
                            </el-button>
                        </div>
                        <div class="path_ctrl">
                            <el-button type="primary" style="width:200px" @click="onClickDrawBezierStroke()">
                                三次贝塞尔曲线(描边)
                            </el-button>
                            <el-button type="primary" style="width:200px" @click="onClickDrawBezierFill()">
                                三次贝塞尔曲线(填充)
                            </el-button>
                        </div>
                        <div class="path_ctrl">
                            <el-button type="danger" style="width:200px" @click="onClickCanvasClear('ex_ctx_path')">清空画布
                            </el-button>
                        </div>
                        <div class="path_ctrl">
                            <div>线型、渐变、图案样式、阴影等暂略...</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane name="ex_canvas_text">
                <template #label>
                    <span class="custom-tabs-label">
                        <span :class="getPanelLabelClass('ex_canvas_text')">绘制文本</span>
                    </span>
                </template>
                <div class="panel-content gradient-content">
                    <div class="img-outer alpha-background-image">
                        <canvas id="ex_ctx_text" class="canvas-content" :width="formDataText.width"
                            :height="formDataText.height"></canvas>
                    </div>
                    <div class="img-setting">
                        <el-form :model="formDataPath" label-width="120px" label-position="top">
                            <el-form-item label="大小">
                                <div class="clm-item">
                                    <div class="title">宽:</div>
                                    <el-input-number v-model="formDataText.width" :min="10" :max="4096" />
                                    <div class="title">高:</div>
                                    <el-input-number v-model="formDataText.height" :min="10" :max="4096" />
                                </div>
                            </el-form-item>
                            <el-form-item label="logo">
                                <el-image class="logo" :src="formDataText.logo" fit="scale-down"></el-image>
                            </el-form-item>
                            <el-form-item label="背景色">
                                <el-color-picker v-model="formDataText.backgroundColor" show-alpha
                                    :predefine="predefineColors" />
                            </el-form-item>
                            <el-form-item label="文本">
                                <el-input v-model="formDataText.text"></el-input>
                            </el-form-item>
                            <el-form-item label="字体大小(px)">
                                <el-input-number v-model="formDataText.fontSize" :min="1" :max="1000"></el-input-number>
                            </el-form-item>
                            <el-form-item label="字体间距(px)">
                                <el-input-number v-model="formDataText.letterSpacing" :min="1"
                                    :max="100"></el-input-number>
                            </el-form-item>
                            <el-form-item label="字体颜色">
                                <el-color-picker v-model="formDataText.color" show-alpha :predefine="predefineColors" />
                            </el-form-item>
                            <el-form-item label="阴影颜色">
                                <el-color-picker v-model="formDataText.shadowColor" show-alpha
                                    :predefine="predefineColors" />
                            </el-form-item>
                            <el-form-item label="阴影模糊度">
                                <el-input-number v-model="formDataText.shadowBlur" :min="0"
                                    :max="100"></el-input-number>
                            </el-form-item>
                            <el-form-item label="阴影偏移">
                                <div class="clm-item">
                                    <div class="title">X:</div>
                                    <el-input-number v-model="formDataText.shadowOffsetX" :min="-200" :max="200" />
                                    <div class="title">Y:</div>
                                    <el-input-number v-model="formDataText.shadowOffsetY" :min="-200" :max="200" />
                                </div>
                            </el-form-item>

                            <el-form-item>
                                <label class="clear-ctx">
                                    <el-checkbox v-model="formDataText.clearCtx" size="small" /> 绘制之前清空画布
                                </label>
                                <el-button type="primary" style="width:200px" @click="onClickDrawText()">绘制文本
                                </el-button>
                                <el-button type="primary" style="width:200px"
                                    @click="onClickSaveText()">保存图片</el-button>
                            </el-form-item>

                        </el-form>

                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts" setup>
import ModalTool from '@/common/ui/ModalTool';
import { ref, onMounted } from 'vue'
// import CanvasTools, { XDrawLines, XPoint, XDrawArc, XCurvePoint, XDrawBezierCurve, XDrawQadraticeCurve } from './canvasTools'
import CanvasTools from '@/xCanvas/CanvasTools'
import { XDrawMode, XPoint, XCurvePoint } from '@/xCanvas/Entity'
import XDrawLines from '@/xCanvas/XDrawLines'
import XDrawArc from '@/xCanvas/XDrawArc'
import XDrawBezierCurve from '@/xCanvas/XDrawBezierCurve'
import XDrawQadraticeCurve from '@/xCanvas/XDrawQadraticeCurve'
import dataImgs from '@/common/data/imgs.json';
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
const pathColor = ref("#000000")
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
        .withColor(pathColor.value)
        .withEndMode(XDrawMode.Fill)
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
        .withColor(pathColor.value)
        .withEndMode(XDrawMode.Stroke)
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
        .withEndAngle(180)
        .withAnticlockwise(false)
        .withColor(pathColor.value)
        .withEndMode(XDrawMode.Fill)
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
        .withStartAngle(180)
        .withEndAngle(360)
        .withAnticlockwise(false)
        .withColor(pathColor.value)
        .withEndMode(XDrawMode.Stroke)
    xDrawArc.draw()
}
function onClickDrawQuadraticFill() {
    let ctx = CanvasTools.getCanvasCtx("ex_ctx_path")
    if (ctx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    let xDraw = new XDrawQadraticeCurve(ctx)
        .withBegin(new XPoint(75, 25))
        .withEndMode(XDrawMode.Fill)
        .withColor(pathColor.value)
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(25, 25)).withEndPoint(new XPoint(25, 62.5)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(25, 100)).withEndPoint(new XPoint(50, 100)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(50, 120)).withEndPoint(new XPoint(30, 125)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(60, 120)).withEndPoint(new XPoint(65, 100)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(125, 100)).withEndPoint(new XPoint(125, 62.5)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(125, 25)).withEndPoint(new XPoint(75, 25)));
    xDraw.draw()
}
function onClickDrawQuadraticStroke() {
    let ctx = CanvasTools.getCanvasCtx("ex_ctx_path")
    if (ctx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    let xDraw = new XDrawQadraticeCurve(ctx)
        .withBegin(new XPoint(75, 25))
        .withEndMode(XDrawMode.Stroke)
        .withColor(pathColor.value)
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(25, 25)).withEndPoint(new XPoint(25, 62.5)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(25, 100)).withEndPoint(new XPoint(50, 100)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(50, 120)).withEndPoint(new XPoint(30, 125)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(60, 120)).withEndPoint(new XPoint(65, 100)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(125, 100)).withEndPoint(new XPoint(125, 62.5)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(125, 25)).withEndPoint(new XPoint(75, 25)));
    xDraw.draw()
}
function onClickDrawBezierStroke() {
    let ctx = CanvasTools.getCanvasCtx("ex_ctx_path")
    if (ctx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    let xDraw = new XDrawBezierCurve(ctx)
        .withBegin(new XPoint(75, 40))
        .withEndMode(XDrawMode.Stroke)
        .withColor(pathColor.value)
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(75, 37)).withCtrlP2(new XPoint(70, 25)).withEndPoint(new XPoint(50, 25)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(20, 25)).withCtrlP2(new XPoint(20, 62.5)).withEndPoint(new XPoint(20, 62.5)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(20, 80)).withCtrlP2(new XPoint(40, 102)).withEndPoint(new XPoint(75, 120)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(110, 102)).withCtrlP2(new XPoint(130, 80)).withEndPoint(new XPoint(130, 62.5)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(130, 62.5)).withCtrlP2(new XPoint(130, 25)).withEndPoint(new XPoint(100, 25)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(85, 25)).withCtrlP2(new XPoint(75, 37)).withEndPoint(new XPoint(75, 40)))
    xDraw.draw()
}
function onClickDrawBezierFill() {
    let ctx = CanvasTools.getCanvasCtx("ex_ctx_path")
    if (ctx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    let xDraw = new XDrawBezierCurve(ctx)
        .withBegin(new XPoint(75, 40))
        .withEndMode(XDrawMode.Fill)
        .withColor(pathColor.value)
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(75, 37)).withCtrlP2(new XPoint(70, 25)).withEndPoint(new XPoint(50, 25)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(20, 25)).withCtrlP2(new XPoint(20, 62.5)).withEndPoint(new XPoint(20, 62.5)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(20, 80)).withCtrlP2(new XPoint(40, 102)).withEndPoint(new XPoint(75, 120)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(110, 102)).withCtrlP2(new XPoint(130, 80)).withEndPoint(new XPoint(130, 62.5)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(130, 62.5)).withCtrlP2(new XPoint(130, 25)).withEndPoint(new XPoint(100, 25)))
        .pushPoint(new XCurvePoint().withCtrlP1(new XPoint(85, 25)).withCtrlP2(new XPoint(75, 37)).withEndPoint(new XPoint(75, 40)))
    xDraw.draw()
}

//#endregion


//#region 绘制文本
let exTextCtx: CanvasRenderingContext2D | null = null
const formDataText = ref({
    clearCtx: true,
    width: 800,
    height: 400,
    text: "8203",
    shadowBlur: 15,
    fontSize: 256,
    shadowOffsetX: 10,
    shadowOffsetY: 5,
    color: "rgba(255,255,255,1)",
    backgroundColor: "rgba(0,0,0,0)",
    shadowColor: "rgba(0, 0, 0, 0.8)",
    letterSpacing: 2,
    logo:dataImgs.images.logo
})
function onClickDrawText() {
    const canvas = <HTMLCanvasElement>document.getElementById("ex_ctx_text")
    if (canvas) {
        canvas.style.letterSpacing = `${formDataText.value.letterSpacing}px`;
    }
    if (exTextCtx == null) {
        exTextCtx = CanvasTools.getCanvasCtx("ex_ctx_text")
    }
    if (exTextCtx == null) {
        ModalTool.ShowDialogWarn("提醒", "初始化Canvas失败!")
        return
    }
    if (formDataRect.value.clearCtx) {
        exTextCtx?.clearRect(0, 0, formDataText.value.width, formDataText.value.height)
    }
    exTextCtx.fillStyle = formDataText.value.backgroundColor;
    exTextCtx.fillRect(0, 0, formDataText.value.width, formDataText.value.height);
    // 设置文字阴影的颜色为黑色，透明度为20%
    exTextCtx.shadowColor = formDataText.value.shadowColor;
    // 将阴影向右移动15px，向上移动10px
    exTextCtx.shadowOffsetX = formDataText.value.shadowOffsetX;
    exTextCtx.shadowOffsetY = formDataText.value.shadowOffsetY;
    // 轻微模糊阴影
    exTextCtx.shadowBlur = formDataText.value.shadowBlur;
    // // 字号为60px，字体为impact
    // exTextCtx.font = `${formDataText.value.fontSize}px 方正粗活意简体` //"16em ";
    // // 将文本填充为棕色
    // exTextCtx.fillStyle = formDataText.value.color;
    // // 将文本设为居中对齐
    // exTextCtx.textAlign = 'center';
    // exTextCtx.textBaseline = 'middle';

    // 在canvas顶部中央的位置，以大字体的形式显示文本
    // exTextCtx.fillText(formDataText.value.text, formDataText.value.width / 2, formDataText.value.height / 2);
    // exRectCtx?.drawImage()
    let logoImg=new Image()
    logoImg.onload=function(){
        console.log("图片加载完成")
        exTextCtx?.drawImage(logoImg,0,0);
    }
    logoImg.onerror=function(err){
        console.log("图片加载失败",err)
    }
    logoImg.src=formDataText.value.logo
    // exTextCtx.restore();
}

function onClickSaveText() {
    let theCanvas = <HTMLCanvasElement>document.getElementById("ex_ctx_text");
    // var imgURL = theCanvas?.toDataURL({ format: "image/png", quality: 1, width: 12000, height: 4000 });
    var imgURL = theCanvas?.toDataURL("image/png", 0.92);
    // console.log(imgURL)
    var dlLink = document.createElement('a');
    dlLink.download = "fileName";
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = ["image/png", dlLink.download, dlLink.href].join(':');
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}
//#endregion
</script>

<style lang="scss" scoped>
.gradient-content {
    display: flex;
    flex-direction: row;
    min-height: 620px;
    border: 1px solid #ada9a9;
    overflow-y: hidden;
    .img-setting {
        width: 580px;
        border-left: 1px solid #ada9a9;
        min-height: 580px;
        display: flex;
        flex-direction: column;
        padding: 5px;
        overflow-y: auto;
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

.clm-item {
    display: flex;
    color: black;

    .title {
        margin-right: 5px;
    }
}

.logo{
    width: 100px; 
    height: 100px;
    background-color: rgb(175, 177, 178);
    padding: 5px;
}
</style>