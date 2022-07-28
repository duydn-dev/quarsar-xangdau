<template>
  <q-list>
    <q-item
      v-for="item in linksList"
      :key="item.link"
      clickable
      @click="menuClick(item)"
      :class="`menu-left-item ${activeMenu == item.name ? 'active': ''}`"
    >
      <q-item-section v-if="item.icon" avatar>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { defineComponent, ref } from "vue";
import constants from "../_common/constants";

export default defineComponent({
  name: "menu-left",
  setup() {
    const linksList = constants.menuLeft;
    const activeMenu = ref(linksList[0].name);
    const menuClick = (item) => {
      activeMenu.value = item.name;
      $router.push(item.link)
    }
    return {
      activeMenu,
      linksList,
      menuClick
    };
  },
});
</script>
