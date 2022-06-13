import ApiBase from "./ApiBase";
const LOCAL_BASEURL = "http://localhost:8090";
export default class ApiLocal {

    static customerList() {
        return ApiBase.GET("/customerList")
            .withEndpoint(LOCAL_BASEURL)
    }
    static customerQuery(name: string) {
        return ApiBase.GET("/customers/query")
            .withQuery({
                name: name
            })
            .withEndpoint(LOCAL_BASEURL)
    }
    static customerAdd(name: string, address: string, phone: string) {
        return ApiBase.POST("/customers/add")
            .withBody({
                name: name,
                address: address,
                phone: phone
            })
            .withEndpoint(LOCAL_BASEURL)
    }
    static customerUpdate(id: string, name: string, address: string, phone: string) {
        return ApiBase.GET("/customers/query")
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
    static customerDelete(id:string){
        return ApiBase.DELETE("/customers/delete")
            .withQuery({
                id: id,
            })
            .withEndpoint(LOCAL_BASEURL)
    }
}