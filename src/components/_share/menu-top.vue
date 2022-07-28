<template>
  <q-toolbar-title class="text-uppercase"></q-toolbar-title>
  <q-btn-dropdown stretch flat>
    <template v-slot:label>
      <div class="row items-center no-wrap">
        <q-avatar v-if="currentUser.avatar">
          <img :src="storageUrl + currentUser.avatar" />
        </q-avatar>
        <q-avatar v-else>
          <q-avatar color="red" text-color="white">D</q-avatar>
        </q-avatar>
        <div class="text-center q-ml-md">{{ currentUser.fullName }}</div>
      </div>
    </template>

    <q-list>
      <q-item clickable v-close-popup>
        <q-item-section avatar>
          <q-avatar
            icon="account_circle"
            color="light-blue-7"
            text-color="white"
          ></q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Trang cá nhân</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-close-popup>
        <q-item-section avatar>
          <q-avatar
            icon="lock_outline"
            color="light-blue-7"
            text-color="white"
          ></q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Quên mật khẩu</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator inset spaced></q-separator>
      <q-item clickable v-close-popup>
        <q-item-section avatar>
          <q-avatar
            icon="subdirectory_arrow_right"
            color="deep-orange-6"
            text-color="white"
          ></q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>Đăng xuất</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const $store = useStore();
const storageUrl = process.env.StorageUrl;
const currentUser = computed({
  get: () => $store.state.users.currentUser,
});
</script>

<style lang="scss" scoped>
</style>