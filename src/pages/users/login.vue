<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="window-height window-width row justify-center items-center"
        style="
          background-color: #0abcf9;
          background-image: linear-gradient(315deg, #0abcf9 0%, #2c69d1 74%);
        "
      >
        <div class="column q-pa-lg">
          <div class="row">
            <q-card
              square
              class="shadow-24"
              style="width: 400px; height: 530px"
            >
              <q-card-section class="bg-blue-8 text-center">
                <img src="/src/assets/logo.svg" class="full-width" />
                <h4 class="text-h5 text-white q-my-md text-uppercase">
                  Hệ thống quản lý xăng dầu quốc gia
                </h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-lg">
                  <q-input
                    square
                    clearable
                    v-model="username"
                    type="text"
                    label="Tài khoản"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Tên tài khoản không thể để trống !',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="account_circle" />
                    </template>
                  </q-input>
                  <q-input
                    square
                    clearable
                    v-model="password"
                    type="password"
                    label="Mật khẩu"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Mật khẩu không thể để trống !',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="blue-7"
                  class="full-width text-white"
                  label="Đăng nhập"
                  @click="login"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">Quên mật khẩu ?</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CryptoJS from "crypto-js";
import constants from "../../components/_common/constants";

export default {
  setup() {
    const $store = useStore();
    const router = useRouter();
    const username = ref();
    const password = ref();
    const $q = useQuasar();

    const login = async () => {
      const request = {
        userName: username.value,
        passWord: password.value,
      };
      const { data } = await api.post("api/User/get-token", request);
      if (data.success) {
        $store.dispatch("users/userLoginAction", data.responseData);
        setTokenAndUser(data.responseData);
        api.defaults.headers.common["Authorization"] =
          "Bearer " + data.responseData.token;
        router.push("/");
      } else {
        $q.notify({
          color: "negative",
          textColor: "white",
          position: "top",
          message: data.message,
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
    };

    const encryptUser = (data) => {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        constants.userKey
      ).toString();
    };
    // clear token cũ
    const setTokenAndUser = (user) => {
      if ($q.cookies.get("cookie_default")) {
        $q.cookies.remove("cookie_default");
      }
      const userEncrypt = encryptUser(user);
      $q.cookies.set("cookie_default", userEncrypt);
    };
    return {
      username,
      password,
      login,
    };
  },
};
</script>

<style>
</style>