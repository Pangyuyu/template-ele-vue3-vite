/**
 * 绘制方式
 */
export enum XDrawMode{
    /**
     * 填充
     */
    Fill,
    /**
     * 描边
     */
    Stroke
}
/*
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