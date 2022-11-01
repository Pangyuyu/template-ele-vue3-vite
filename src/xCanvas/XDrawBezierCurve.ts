import {XDrawMode,XPoint,XCurvePoint} from './entity'
/**
 * 绘制三次贝塞尔曲线
 */
 export default class XDrawBezierCurve {
    ctx: CanvasRenderingContext2D;//Canvas渲染上下文
    /**
     * 初始化绘制三次贝塞尔曲线
     * @param ctx 初始化
     */
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    beginPoint: XPoint = new XPoint(0, 0)
    withBegin(begin: XPoint): XDrawBezierCurve {
        this.beginPoint = begin
        return this;
    }
    curvePointList: Array<XCurvePoint> = new Array<XCurvePoint>()
    pushPoint(value: XCurvePoint): XDrawBezierCurve {
        this.curvePointList.push(value)
        return this;
    }
    endMode: XDrawMode = XDrawMode.Stroke;//结束模式，fill:填充；stroke:描边
    withEndMode(value: XDrawMode): XDrawBezierCurve {
        this.endMode = value
        return this;
    }
    color: string = "rgba(#000000,1)"
    withColor(value: string): XDrawBezierCurve {
        this.color = value
        return this;
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.beginPoint.x, this.beginPoint.y)
        this.curvePointList.forEach((item: XCurvePoint) => {
            this.ctx.bezierCurveTo(item.ctrlPoint1.x, item.ctrlPoint1.y, item.ctrlPoint2.x, item.ctrlPoint2.y, item.endPoint.x, item.endPoint.y)
        })
        if (this.endMode == XDrawMode.Fill) {
            this.ctx.fillStyle=this.color
            this.ctx.fill()
        } else {
            this.ctx.strokeStyle=this.color
            this.ctx.stroke()
        }
        // this.ctx.closePath()

    }
}