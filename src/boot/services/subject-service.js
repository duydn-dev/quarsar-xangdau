import { api } from "../axios"
export default {
    url: "api/doituongquanly",
    list(){
        return api.get(`${this.url}/list-doituong`)
    }
}