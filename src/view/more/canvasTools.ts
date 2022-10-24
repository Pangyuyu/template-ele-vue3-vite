export default class CanvasTools {
    static getCanvasCtx(canvasId: string): CanvasRenderingContext2D | null {
        let theEle = document.getElementById(canvasId);
        if (theEle == undefined || theEle == null) {
            return null
        }
        let theCanvas = <HTMLCanvasElement>theEle
        if (theCanvas == undefined || theCanvas == null) {
            return null
        }
        //TODO 下面初始化的含义有待研究
        const canvasCtx = theCanvas.getContext("2d", {
            alpha: true,//Canvas是否支持透明度
            antialias: true,//是否开启抗锯齿
            depth: true,//表明绘制缓冲区包含一个深度至少为 16 位的缓冲区
            failIfMajorPerformanceCaveat: true,//表明在一个系统性能低的环境是否创建该上下文的boolean值。
            /*powerPreference: 指示浏览器在运行 WebGL 上下文时使用相应的 GPU 电源配置。可能值如下
            "default":自动选择，默认值。
            "high-performance": 高性能模式。
            "low-power": 节能模式。
            */
            powerPreference: "high-performance",
            premultipliedAlpha: true,//表明排版引擎将假设绘制缓冲区包含预混合 alpha 通道的boolean值。
            preserveDrawingBuffer: true,//如果这个值为true缓冲区将不会被清除，会保存下来，直到被清除或被使用者覆盖。
            stencil: true,//表明绘制缓冲区包含一个深度至少为 8 位的模版缓冲区boolean值。
        })
        if (canvasCtx == undefined || canvasCtx == null) {
            return null
        }
        return <CanvasRenderingContext2D>canvasCtx
    }
}
/**
 * 位置
 */
export class XPoint {
    x: number = 0;
    y: number = 0;
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}
/**
 * 曲线点，用于绘制贝塞尔曲线
 */
export class XCurvePoint {
    ctrlPoint1: XPoint = new XPoint(0, 0);
    ctrlPoint2: XPoint = new XPoint(0, 0);
    endPoint: XPoint = new XPoint(0, 0);
    withCtrlP1(ctrl: XPoint): XCurvePoint {
        this.ctrlPoint1 = ctrl
        return this;
    }
    withCtrlP2(ctrl: XPoint): XCurvePoint {
        this.ctrlPoint2 = ctrl;
        return this;
    }
    withEndPoint(end: XPoint): XCurvePoint {
        this.endPoint = end;
        return this;
    }
}
/**
 * 绘制线
 */
export class XDrawLines {
    ctx: CanvasRenderingContext2D;//Canvas渲染上下文
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    start: XPoint = new XPoint(0, 0);//开始位置
    points: Array<XPoint> = new Array<XPoint>();//线段各个点的位置
    endMode: 'fill' | 'stroke' = 'stroke';//结束模式，fill:填充；stroke:描边
    withStart(value: XPoint): XDrawLines {
        this.start = value
        return this;
    }
    withEndMode(value: 'fill' | 'stroke'): XDrawLines {
        this.endMode = value
        return this;
    }
    addPoint(value: XPoint): XDrawLines {
        this.points.push(value)
        return this;
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.start.x, this.start.y);
        this.points.forEach(point => {
            this.ctx.lineTo(point.x, point.y)
        })
        if (this.endMode == 'fill') {
            this.ctx.fill()
        } else {
            this.ctx.closePath()
            this.ctx.stroke()
        }
    }
}
/**
 * 绘制圆弧
 */
export class XDrawArc {
    ctx: CanvasRenderingContext2D;//Canvas渲染上下文
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    centerPoint: XPoint = new XPoint(0, 0);//圆弧（圆）的中心
    radius: number = 10;//半径
    startAngle: number = 0;//开始角度
    endAngle: number = 180;//结束角度
    anticlockwise: boolean = true;//true:逆时针；false:顺时针
    endMode: 'fill' | 'stroke' = 'stroke';//结束模式，fill:填充；stroke:描边
    withCenterPoint(value: XPoint): XDrawArc {
        this.centerPoint = value
        return this;
    }
    withRadius(value: number): XDrawArc {
        this.radius = value;
        return this;
    }
    withStartAngle(value: number): XDrawArc {
        this.startAngle = value
        return this;
    }
    withEndAngle(value: number): XDrawArc {
        this.endAngle = value;
        return this;
    }
    withAnticlockwise(value: boolean): XDrawArc {
        this.anticlockwise = value;
        return this
    }
    withEndMode(value: 'fill' | 'stroke'): XDrawArc {
        this.endMode = value
        return this;
    }
    draw() {
        this.ctx.beginPath()
        let startRadian = (Math.PI / 180) * this.startAngle
        let endRadian = (Math.PI / 180) * this.endAngle
        this.ctx.arc(this.centerPoint.x,
            this.centerPoint.y,
            this.radius,
            startRadian,
            endRadian,
            this.anticlockwise)
        if (this.endMode == 'fill') {
            this.ctx.fill()
        } else {
            this.ctx.stroke()
        }
    }
}

/**
 * 绘制二次贝塞尔曲线
 */
export class XDrawQadraticeCurve {
    ctx: CanvasRenderingContext2D;//Canvas渲染上下文
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    beginPoint: XPoint = new XPoint(0, 0)
    withBegin(begin: XPoint): XDrawQadraticeCurve {
        this.beginPoint = begin
        return this;
    }
    curvePointList: Array<XCurvePoint> = new Array<XCurvePoint>()
    pushPoint(point: XCurvePoint): XDrawQadraticeCurve {
        this.curvePointList.push(point)
        return this;
    }
    endMode: 'fill' | 'stroke' = 'stroke';//结束模式，fill:填充；stroke:描边
    withEndMode(value: 'fill' | 'stroke'): XDrawBezierCurve {
        this.endMode = value
        return this;
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.beginPoint.x, this.beginPoint.y)
        this.curvePointList.forEach((item: XCurvePoint) => {
            this.ctx.quadraticCurveTo(item.ctrlPoint1.x, item.ctrlPoint1.y, item.endPoint.x, item.endPoint.y)
        })

        if (this.endMode == 'fill') {
            this.ctx.fill()
        } else {
            this.ctx.stroke()
        }
        // this.ctx.closePath()

    }
}
/**
 * 绘制三次贝塞尔曲线
 */
export class XDrawBezierCurve {
    ctx: CanvasRenderingContext2D;//Canvas渲染上下文
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    beginPoint: XPoint = new XPoint(0, 0)
    withBegin(begin: XPoint): XDrawQadraticeCurve {
        this.beginPoint = begin
        return this;
    }
    curvePointList: Array<XCurvePoint> = new Array<XCurvePoint>()
    pushPoint(point: XCurvePoint): XDrawQadraticeCurve {
        this.curvePointList.push(point)
        return this;
    }
    endMode: 'fill' | 'stroke' = 'stroke';//结束模式，fill:填充；stroke:描边
    withEndMode(value: 'fill' | 'stroke'): XDrawBezierCurve {
        this.endMode = value
        return this;
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.beginPoint.x, this.beginPoint.y)
        this.curvePointList.forEach((item: XCurvePoint) => {
            this.ctx.bezierCurveTo(item.ctrlPoint1.x, item.ctrlPoint1.y, item.ctrlPoint2.x, item.ctrlPoint2.y, item.endPoint.x, item.endPoint.y)
        })
        if (this.endMode == 'fill') {
            this.ctx.fill()
        } else {
            this.ctx.stroke()
        }
        // this.ctx.closePath()

    }
}