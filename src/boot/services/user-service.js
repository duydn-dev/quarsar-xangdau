import { api } from "../axios"
export default {
    url: "api/user",
    getList(request){
        return api.get(this.url, {params: request})
    },
    getById(id){
        return api.get(`${this.url}/${id}`);
    }
}