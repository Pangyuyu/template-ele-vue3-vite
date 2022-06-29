import ApiBase from "./ApiBase";
import axios from "axios";
// const LOCAL_BASEURL = "http://192.168.2.105";
const LOCAL_BASEURL = "http://localhost";
let LOCAL_PORT = "8092"
export default class ApiLocal {
    static getBaseUrl() {
        return `${LOCAL_BASEURL}:${LOCAL_PORT}`
    }
    static setLocalPort(port: string) {
        LOCAL_PORT = port
    }
    static customerList() {
        return ApiBase.GET("/customers")
            .withEndpoint(ApiLocal.getBaseUrl())
    }
    static customerQuery(name: string) {
        return ApiBase.GET("/customer/query")
            .withQuery({
                name: name
            })
            .withEndpoint(ApiLocal.getBaseUrl())
    }
    static customerAdd(name: string, address: string, phone: string) {
        return ApiBase.POST("/customer")
            .withBody({
                name: name,
                address: address,
                phone: phone
            })
            .withEndpoint(ApiLocal.getBaseUrl())
    }
    static customerUpdate(id: string, name: string, address: string, phone: string) {
        return ApiBase.PUT("/customer")
            .withQuery({
                id: id,
            })
            .withBody({
                name: name,
                address: address,
                phone: phone
            })
            .withEndpoint(ApiLocal.getBaseUrl())
    }
    static customerDelete(id: string) {
        return ApiBase.DELETE("/customer")
            .withQuery({
                id: id,
            })
            .withEndpoint(ApiLocal.getBaseUrl())
    }
    /**
     * 随机图片
     * @param t 类型 base64,bytes
     * @param w 宽度
     * @param h 高度
     * @returns 
     */
    static imageRandom(w: number, h: number) {
        return ApiBase.GET("/image/random")
            .withQuery({
                t: "base64",
                w: w,
                h: h
            })
            .withEndpoint(ApiLocal.getBaseUrl())
    }
    static imageRandomUrl(w: number, h: number) {
        /*若直接返回地址，在快速刷新的时候，会导致图片不会刷新*/
        const timestamp=new Date().getTime()
        return `${LOCAL_BASEURL}:${LOCAL_PORT}/image/random?timestamp=${timestamp}&t=blob&w=${w}&h=${h}`
    }
    static imageRandomBlob(w: number, h: number): Promise<any> {
        /*下面的方法，可用以非常快速的方式刷新图片*/
        return new Promise((resolve, __) => {
            const timestamp = new Date().getTime()
            const url = `${LOCAL_BASEURL}:${LOCAL_PORT}/image/random?timestamp=${timestamp}&t=blob&w=${w}&h=${h}`
            axios({
                method: 'get',
                url: url,
                responseType: "blob"
            }).then(res => {
                resolve(res)
            });
        })
    }
    /**
     * 获取二维码
     * @param qrContent 二维码内容
     * @param level 等级  
     *  L:低质量，7%的容错率  
        M:中等质量，15%容错率  
        Q:高质量，25%容错率,  
        H：超高质量：30%容错率:  
     * @param size 大小
     */
    static getQr(qrContent: string, level: string, size: number) {
        return ApiBase.POST("/qr")
            .withBody({
                content: qrContent,
                level: level,
                size: size
            })
            .withEndpoint(ApiLocal.getBaseUrl())
    }
}