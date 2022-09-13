import { api } from "../axios"
export default {
    url: "api/position",
    dropdown(){
        return api.get(`${this.url}/dropdown`)
    }
}