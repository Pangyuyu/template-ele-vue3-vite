import { XDrawMode, XPoint } from './entity'
/**
 * 绘制圆弧
 */
export default class XDrawArc {
    ctx: CanvasRenderingContext2D;//Canvas渲染上下文
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    centerPoint: XPoint = new XPoint(0, 0);//圆弧（圆）的中心
    radius: number = 10;//半径
    startAngle: number = 0;//开始角度
    endAngle: number = 180;//结束角度
    anticlockwise: boolean = true;//true:逆时针；false:顺时针
    endMode: XDrawMode = XDrawMode.Stroke;//结束模式，fill:填充；stroke:描边
   
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
    withEndMode(value: XDrawMode): XDrawArc {
        this.endMode = value
        return this;
    }
    color: string = "rgba(#000000,1)"
    withColor(value: string): XDrawArc {
        this.color = value
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
        if (this.endMode == XDrawMode.Fill) {
            this.ctx.fillStyle=this.color
            this.ctx.fill()
        } else {
            this.ctx.strokeStyle=this.color
            this.ctx.stroke()
        }
    }
}