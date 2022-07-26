<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Hệ thống quản lý xăng dầu quốc gia </q-toolbar-title>
        <q-btn-dropdown stretch flat>
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-avatar v-if="currentUser.avatar">
                <img :src="currentUser.avatar">
              </q-avatar>
              <q-avatar v-else>
                <q-avatar color="red" text-color="white">D</q-avatar>
              </q-avatar>
              <div class="text-center q-ml-md">{{currentUser.fullName}}</div>
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
        <!-- <div>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          Đỗ ngọc duy
        </div> -->
      </q-toolbar>
    </q-header>

    <q-drawer :mini="miniState" show-if-above bordered>
      <menu-left />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import menuLeft from "src/components/_share/menu-left.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    menuLeft,
  },

  setup() {
    const $store = useStore();
    const currentUser = computed({
      get: () => $store.state.users.currentUser,
    })
    const leftDrawerOpen = ref(true);
    const miniState = ref(false);

    return {
      leftDrawerOpen,
      miniState,
      currentUser,
      toggleLeftDrawer() {
        miniState.value = !miniState.value;
      },
    };
  },
});
</script>
