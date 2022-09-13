<template>
  <q-dialog v-model="isShow" class="model-wrap">
    <q-card style="width: 800px">
      <!-- model header -->
      <q-card-section class="model-header row items-center">
        <div class="text-h6">
          {{ id ? "Cập nhật người dùng" : "Thêm mới người dùng" }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense @click="close" />
      </q-card-section>
      <q-separator />
      <!-- model header -->

      <!-- model body -->
      <q-card-section style="max-height: 50vh" class="scroll">
        <q-form ref="user_form">
          <!-- <q-icon name="fa-solid fa-ambulance"></q-icon> -->

          <div class="row">
            <div class="col-12 col-md">
              <avatar-upload />
            </div>
            <div class="col-12 col-md">
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
          <div class="row">
            <div class="col-12 col-md row-item">
              <q-select
                v-model="form.userPositionId"
                label="Nhóm tài khoản *"
                option-value="userPositionId"
                option-label="userPositionName"
                :options="userPositions"
                lazy-rules
                clearable
                :rules="[(val) => val || 'Nhóm tài khoản không thể để trống !']"
              />
            </div>
            <div class="col-12 col-md">
              <q-select
                v-model="form.maDoiTuong"
                label="Đối tượng"
                :options="subjects"
                option-value="maDoiTuong"
                option-label="tenDoiTuong"
                clearable
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md">
              <q-input v-model="form.fullName" label="Họ và tên" />
            </div>
            <div class="col-12 col-md">
              <q-input v-model="form.numberPhone" label="Số điện thoại" />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md">
              <q-input v-model="form.email" label="Email" />
            </div>
            <div class="col-12 col-md">
              <q-input v-model="form.address" label="Địa chỉ" />
            </div>
          </div>
          <div class="row items-baseline">
            <div class="col-12 col-md">
              <q-toggle
                v-model="form.isBCT"
                checked-icon="check"
                color="primary"
                unchecked-icon="clear"
                label="Tài khoản Bộ Công Thương"
                left-label
              />
            </div>
            <div class="col-12 col-md">
              <q-select
                v-model="form.status"
                :options="userStatus"
                label="Trạng thái"
                option-value="id"
                option-label="name"
                clearable
                lazy-rules
                :rules="[(val) => val || 'Trạng thái không thể để trống !']"
              />
            </div>
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
import { useStore } from "vuex";

export default defineComponent({
  props: ["id"],
  components: {
    avatarUpload,
  },
  async setup(props, { emit }) {
    const _this = getCurrentInstance();
    const _config = getCurrentInstance().appContext.config.globalProperties;
    const $store = useStore();

    const userStatus = $store.state.users.userStatus;
    let userPositions = [];
    let subjects = [];
    let form = reactive({
      isBCT: false,
      userPositionId: "aaa4ffb6-3a41-464e-b439-794b6b8f277a"
    });

    const getUserPositions = async () => {
      const { data } = await _config.$userPositionService.dropdown();
      //userPositions.values = data;
      userPositions.values = [
        {
          userPositionId: "231fadff-24c2-4d2c-ac4c-453a59e39b93",
          userPositionName: "Bộ công thương theo dõi",
          isAdministrator: false,
          createdBy: "86616423-f545-48f5-ba03-32fb6497743d",
          createdDate: "2022-04-29T10:44:18.7885041",
          modifiedBy: "86616423-f545-48f5-ba03-32fb6497743d",
          modifiedDate: "2022-05-24T11:15:07.1857748",
          status: 1,
          localityAccept: null,
        },
        {
          userPositionId: "aaa4ffb6-3a41-464e-b439-794b6b8f277a",
          userPositionName: "Thương nhân theo dõi",
          isAdministrator: false,
          createdBy: "86616423-f545-48f5-ba03-32fb6497743d",
          createdDate: "2022-04-27T10:16:47.7841958",
          modifiedBy: "86616423-f545-48f5-ba03-32fb6497743d",
          modifiedDate: "2022-05-24T11:15:38.6957696",
          status: 1,
          localityAccept: null,
        },
        {
          userPositionId: "5b7ecc0e-87e9-45b9-825e-8bd1b793457f",
          userPositionName: "Quản trị viên",
          isAdministrator: true,
          createdBy: null,
          createdDate: "2022-02-24T14:57:11.3085664",
          modifiedBy: "86616423-f545-48f5-ba03-32fb6497743d",
          modifiedDate: "2022-05-24T11:17:27.1502596",
          status: 1,
          localityAccept: null,
        },
        {
          userPositionId: "34dc8f88-6677-45b8-ae23-d62ef63c95fc",
          userPositionName: "Thương nhân xử lý",
          isAdministrator: false,
          createdBy: "86616423-f545-48f5-ba03-32fb6497743d",
          createdDate: "2022-04-27T09:35:03.2673684",
          modifiedBy: "86616423-f545-48f5-ba03-32fb6497743d",
          modifiedDate: "2022-05-24T11:15:49.7512749",
          status: 1,
          localityAccept: null,
        },
        {
          userPositionId: "10280ba4-6626-49e5-b84a-f7c088f3ffe9",
          userPositionName: "Bộ công thương xử lý",
          isAdministrator: false,
          createdBy: "86616423-f545-48f5-ba03-32fb6497743d",
          createdDate: "2022-04-29T10:33:40.8404411",
          modifiedBy: "86616423-f545-48f5-ba03-32fb6497743d",
          modifiedDate: "2022-05-24T11:15:20.6909718",
          status: 1,
          localityAccept: null,
        },
      ];
    };
    const getDoiTuongs = async () => {
      const { data } = await _config.$subjectService.list();
      subjects.values = data;
    };
    const getById = async () => {
      const { data } = await _config.$userService.getById(props.id);
      form = data;
    };
    const onSubmit = async () => {
      const success = await _this.refs.user_form.validate();
      if (success) {
        alert("true");
      }
      return;
    };
    const close = () => {
      emit("close", false);
    };

    // starting method
    await getUserPositions();
    await getDoiTuongs();
    //if (props.id) await getById();
    return {
      isShow: ref(true),
      id: props.id,
      form,
      userStatus,
      userPositions: userPositions.values,
      subjects: subjects.values,
      close,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>