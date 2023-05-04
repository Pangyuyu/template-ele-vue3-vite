// 自定义音频节点：测试
let logi = 0;
// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//一个音频节点
class TestNoiseProcessor extends AudioWorkletProcessor {
    constructor(...args) {
        super(...args);
        this.port.onmessage = (e) => {
            console.debug("TestNoiseProcessor",e.data);
            this.port.postMessage("pong");
        };
    }
    process(inputs, outputs, parameters) {
        
        if (inputs.length > 0) {
            const input = inputs[0]
            const output = outputs[0]
            for (let i = 0; i < input.length; i++) {
                for (let j = 0; j < input[i].length; j++) {
                    output[i][j] = input[i][j]
                }
            }
        }
        if (logi<1000&&logi%10==0) {
            logi++
            console.debug(parameters)
            // console.debug("test-noise-processor" + logi, outputs)
        }
        // audioCtx.decodeAudioData(outputs,
        //     buffer => {
        //         //buffer是一个AudioBuffer对象
        //         console.debug(buffer)
        //     }, err => {
        //         console.warn(err)
        //     })
        return true
    }
}

registerProcessor('test-noise-processor', TestNoiseProcessor)
