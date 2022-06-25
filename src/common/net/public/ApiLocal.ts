import ApiBase from "./ApiBase";
const LOCAL_BASEURL = "http://localhost:8091";
export default class ApiLocal {
    static customerList() {
        return ApiBase.GET("/customers")
            .withEndpoint(LOCAL_BASEURL)
    }
    static customerQuery(name: string) {
        return ApiBase.GET("/customer/query")
            .withQuery({
                name: name
            })
            .withEndpoint(LOCAL_BASEURL)
    }
    static customerAdd(name: string, address: string, phone: string) {
        return ApiBase.POST("/customer")
            .withBody({
                name: name,
                address: address,
                phone: phone
            })
            .withEndpoint(LOCAL_BASEURL)
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
            .withEndpoint(LOCAL_BASEURL)
    }
    static customerDelete(id: string) {
        return ApiBase.DELETE("/customer")
            .withQuery({
                id: id,
            })
            .withEndpoint(LOCAL_BASEURL)
    }
    static imageRandom(w: number, h: number) {
        return ApiBase.GET("/image/random/solid")
            .withQuery({
                w: w,
                h: h
            })
            .withEndpoint(LOCAL_BASEURL)
    }
    static imageRandomColor(w: number, h: number) {
        return ApiBase.GET("/image/random/mottled")
            .withQuery({
                w: w,
                h: h
            })
            .withEndpoint(LOCAL_BASEURL)
    }
}