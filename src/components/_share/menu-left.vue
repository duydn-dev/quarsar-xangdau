<template>
  <q-list>
    <q-item v-for="item in linksList" :key="item.link" clickable @click="$router.push(item.link)">
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
import { defineComponent } from "vue";
import constants from '../_common/constants';

export default defineComponent({
  name: "menu-left",
  setup() {
    const linksList = constants.menuLeft;

    return {
      linksList,
    };
  },
});
</script>
