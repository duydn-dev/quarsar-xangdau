<template>
  <q-intersection v-for="index in 1" :key="index" class="example-item">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar class="height-70">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
            :title="miniState ? 'Nhấn để ẩn menu' : 'Nhấn để mở menu'"
          />
          <menuTop />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="miniState" show-if-above class="menu-left-box">
        <q-item class="bg-blue-8 height-70">
          <img src="logo.svg" class="full-width" />
        </q-item>
        <menu-left />
      </q-drawer>

      <q-page-container class="bg-grey-3 custom-q-contain">
        <suspense>
          <router-view />
        </suspense>
      </q-page-container>
    </q-layout>
  </q-intersection>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import menuLeft from "src/components/_share/menu-left.vue";
import menuTop from "src/components/_share/menu-top.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    menuLeft,
    menuTop,
  },

  setup() {
    const leftDrawerOpen = ref(true);
    const miniState = ref(false);

    return {
      leftDrawerOpen,
      miniState,
      toggleLeftDrawer() {
        miniState.value = !miniState.value;
      },
    };
  },
});
</script>
