import {XDrawMode,XPoint} from './Entity'
/**
 * 绘制线
 */
 export default class XDrawLines {
    ctx: CanvasRenderingContext2D;//Canvas渲染上下文
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    start: XPoint = new XPoint(0, 0);//开始位置
    points: Array<XPoint> = new Array<XPoint>();//线段各个点的位置
    endMode: XDrawMode = XDrawMode.Stroke;//结束模式，fill:填充；stroke:描边
    withStart(value: XPoint): XDrawLines {
        this.start = value
        return this;
    }
    withEndMode(value: XDrawMode): XDrawLines {
        this.endMode = value
        return this;
    }
    addPoint(value: XPoint): XDrawLines {
        this.points.push(value)
        return this;
    }
    color: string = "rgba(#000000,1)"
    withColor(value: string): XDrawLines {
        this.color = value
        return this;
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.moveTo(this.start.x, this.start.y);
        this.points.forEach(point => {
            this.ctx.lineTo(point.x, point.y)
        })
        if (this.endMode == XDrawMode.Fill) {
            this.ctx.fillStyle=this.color
            this.ctx.fill()
        } else {
            this.ctx.closePath()
            this.ctx.strokeStyle=this.color
            this.ctx.stroke()
        }
    }
}