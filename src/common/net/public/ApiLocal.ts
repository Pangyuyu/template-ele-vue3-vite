import ApiBase from "./ApiBase";
const LOCAL_BASEURL = "http://localhost:8090";
export default class ApiLocal {

    static getCustomerList() {
        return ApiBase.GET("/db/customers")
            .withEndpoint(LOCAL_BASEURL)
    }
}