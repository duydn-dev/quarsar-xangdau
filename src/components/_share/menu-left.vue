<template>
  <ul class="aside">
    <li v-for="item in linksList" :key="item.link" clickable >
      <router-link :to="item.link">
        <q-icon :name="item.icon" />
        {{item.title}}
      </router-link>
    </li>
  </ul>
</template>
<script>
import { defineComponent, ref } from "vue";
import constants from "../_common/constants";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "menu-left",
  setup() {
    const router = useRouter();
    const linksList = constants.menuLeft;
    const activeMenu = ref(linksList[0].name);
    const menuClick = (item) => {
      activeMenu.value = item.name;
      router.push(item.link);
    };
    return {
      activeMenu,
      linksList,
      menuClick,
    };
  },
});
</script>
