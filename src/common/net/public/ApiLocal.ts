import ApiBase from "./ApiBase";
const LOCAL_BASEURL = "http://localhost";
let LOCAL_PORT="8091"
export default class ApiLocal {
    static getBaseUrl(){
        return `${LOCAL_BASEURL}:${LOCAL_PORT}`
    }
    static setLocalPort(port:string){
        LOCAL_PORT=port
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
    static imageRandom(w: number, h: number) {
        return ApiBase.GET("/image/random/solid")
            .withQuery({
                w: w,
                h: h
            })
            .withEndpoint(ApiLocal.getBaseUrl())
    }
    static imageRandomColor(w: number, h: number) {
        return ApiBase.GET("/image/random/mottled")
            .withQuery({
                w: w,
                h: h
            })
            .withEndpoint(ApiLocal.getBaseUrl())
    }
}