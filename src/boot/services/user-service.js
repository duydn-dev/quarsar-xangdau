import { api } from "../axios"
export default {
    url: "api/User",
    getList(request){
        return api.get(this.url, {params: request})
    },
    getById(id){
        return api.get(`${this.url}/${id}`);
    },
    getToken(request){
        return api.post(`${this.url}/get-token`, request);
    }
}