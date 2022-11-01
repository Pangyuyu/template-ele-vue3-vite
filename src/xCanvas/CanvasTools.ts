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