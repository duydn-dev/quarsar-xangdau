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
    },
    create(request){
        return api.post(`${this.url}/create`, request);
    },
    update(id, request){
        return api.put(`${this.url}/update/${id}`, request);
    },
    delete(id){
        return api.delete(`${this.url}/delete/${id}`);
    }
}