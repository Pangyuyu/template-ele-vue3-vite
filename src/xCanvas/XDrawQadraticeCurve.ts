import {XDrawMode,XPoint,XCurvePoint} from './Entity'
/**
 * 绘制二次贝塞尔曲线
 */
 export default class XDrawQadraticeCurve {
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
    pushPoint(value: XCurvePoint): XDrawQadraticeCurve {
        this.curvePointList.push(value)
        return this;
    }
    endMode: XDrawMode = XDrawMode.Stroke;//结束模式，fill:填充；stroke:描边
    withEndMode(value: XDrawMode): XDrawQadraticeCurve {
        this.endMode = value
        return this;
    }
    color: string = "rgba(#000000,1)"
    withColor(value: string): XDrawQadraticeCurve {
        this.color = value
        return this;
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.beginPoint.x, this.beginPoint.y)
        this.curvePointList.forEach((item: XCurvePoint) => {
            this.ctx.quadraticCurveTo(item.ctrlPoint1.x, item.ctrlPoint1.y, item.endPoint.x, item.endPoint.y)
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