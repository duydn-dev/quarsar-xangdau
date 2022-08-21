import { api } from "../axios"
export default {
    url: "api/file",
    uploadFile(file) {
        var formData = new FormData();
        if (file) formData.append('file', file);
        return api.post(`${this.url}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    uploadFiles(files) {
        var formData = new FormData();
        if(files && files.length > 0){
            array.forEach((file, i) => {
                formData.append(`file_${i}`, file);
            });
        }
        return api.post(`${this.url}/uploads`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}