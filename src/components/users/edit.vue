<template>
  <q-dialog v-model="isShow">
    <q-card style="width: 800px">
      <q-card-section>
        <div class="text-h6">{{id ? "Cập nhật người dùng" : "Thêm mới người dùng"}}</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <!-- <q-icon name="fa-solid fa-ambulance"></q-icon> -->
        <avatar-upload />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Lưu" color="primary" />
        <q-btn flat label="Đóng" color="primary" v-close-popup @click="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import avatarUpload from 'components/_common/avatar-upload.vue'

export default defineComponent({
  props:['id'],
  components: {
    avatarUpload,
  },
  async setup(props, {emit}) {
    const form = reactive({});
    const close = () => {
      emit('close', false)
    }
    return {
      isShow: ref(true),
      id: props.id,
      form,
      close
    };
  },
});
</script>

<style lang="scss" scoped>
</style>