<template>
  <q-dialog v-model="isShow" class="model-wrap">
    <q-card style="width: 800px">
      <!-- model header -->
      <q-card-section class="model-header">
        <label class="text-h6">
          {{ id ? "Cập nhật người dùng" : "Thêm mới người dùng" }}
        </label>
      </q-card-section>
      <q-separator />
      <!-- model header -->

      <!-- model body -->
      <q-card-section style="max-height: 50vh" class="scroll">
        <q-form class="q-gutter-md" ref="user_form">
          <!-- <q-icon name="fa-solid fa-ambulance"></q-icon> -->

          <div class="row">
            <div class="col">
              <avatar-upload />
            </div>
            <div class="col">
              <q-input
                v-model="form.userName"
                label="Tên tài khoản *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Tên tài khoản không thể để trống !',
                ]"
              />

              <q-input
                type="password"
                v-model="form.passWord"
                label="Mật khẩu *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Mật khẩu không thể để trống !',
                ]"
              />
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col">
              <q-select v-model="form.userPositionId" label="Nhóm tài khoản *" :options="options" class="full-width" />
            </div>
            <div class="col">
              <q-select v-model="form.maDoiTuong" label="Đối tượng" :options="options" class="full-width" />
            </div>
            <!-- <q-select v-model="model" :options="options" :dense="true"></q-select> -->
          </div>
        </q-form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Lưu" color="primary" @click="onSubmit" />
        <q-btn flat label="Đóng" color="primary" v-close-popup @click="close" />
      </q-card-actions>
      <!-- model body -->
    </q-card>
  </q-dialog>
</template>

<style scoped>
</style>
<script>
import { defineComponent, reactive, ref, getCurrentInstance } from "vue";
import avatarUpload from "components/_common/avatar-upload.vue";

export default defineComponent({
  props: ["id"],
  components: {
    avatarUpload,
  },
  async setup(props, { emit }) {
    const _this = getCurrentInstance();
    // const _config = getCurrentInstance().appContext.config.globalProperties;
    const form = reactive({});
    const close = () => {
      emit("close", false);
    };
    const onSubmit = async () => {
      const success = await _this.refs.user_form.validate();
      if (success) {
        alert("true");
      }
      return;
    };
    return {
      isShow: ref(true),
      id: props.id,
      form,
      options: [
        {
          label: "Google",
          value: "Google",
          description: "Search engine",
          category: "1",
        },
        {
          label: "Facebook",
          value: "Facebook",
          description: "Social media",
          category: "1",
        },
        {
          label: "Twitter",
          value: "Twitter",
          description: "Quick updates",
          category: "2",
        },
        {
          label: "Apple",
          value: "Apple",
          description: "iStuff",
          category: "2",
        },
        {
          label: "Oracle",
          value: "Oracle",
          disable: true,
          description: "Databases",
          category: "3",
        },
      ],
      close,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>