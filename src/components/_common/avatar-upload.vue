<template>
    <div class="full-width">
        <div class="avatar-wrapper relative-position">
            <img :src="defaultImg != previewImg ? (storageUrl + previewImg) : defaultImg" class="avatar-chooser full-width" />
            <div class="avatar-overlay absolute-center">
                <input type="file" hidden ref="avatar_file" @change="onChange">
                <q-btn round color="secondary" icon="add_a_photo" @click="triggerClick" />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch, getCurrentInstance } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
    name:"avatar-upload",
    async setup(props, {emit}){
        const $q = useQuasar();
        const _this = getCurrentInstance();
        const _config = _this.appContext.config.globalProperties;
        const defaultImg = 'src/assets/no-image.webp';
        const previewImg = ref(defaultImg);
        const storageUrl = process.env.StorageUrl;

        const onChange = async (event) => {
            if(event.target.files.length > 0){
                try {
                    const response = await _config.$fileService.uploadFile(event.target.files[0]);
                    previewImg.value = response.data;
                    emit('value', previewImg.value);
                } catch (error) {
                    $q.notify({
                    color: "negative",
                    textColor: "white",
                    position: "top",
                    message: error.response.data,
                    icon: "report_problem",
                    timeout: 1500,
                    actions: [
                        {
                        icon: "close",
                        "aria-label": "Dismiss",
                        },
                    ],
                    });
                }
            }
        }
        const triggerClick = () => {
            _this.refs.avatar_file.click();
        }
        return{
            defaultImg,
            previewImg,
            storageUrl,
            onChange,
            triggerClick
        }
    }
})
</script>

<style lang="scss" scoped>

</style>