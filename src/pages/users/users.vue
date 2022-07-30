<template>
  <q-page class="custom-q-page">
    <h5 class="text-h5 text-bold txt-title">Quản lý tài khoản</h5>
    <div class="contain-box">
      <div class="contain-box-filter row justify-end">
        <q-input v-model="search" placeholder="Tìm kiếm" outlined :dense="true">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="contain-box-body">
        <!-- <q-table
          :rows="rows"
          :separator="'cell'"
          :columns="columns"
          row-key="index"
          hide-bottom
        /> -->
        <q-table
          style="height: 400px"
          title="Treats"
          :rows="rows"
          :columns="columns"
          row-key="index"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const colums = [
      {
        name: "STT",
        label: "STT",
        field: "STT",
      },
      {
        name: "name",
        label: "Dessert (100g serving)",
        align: "left",
        sortable: false,
      },
    ];
    const rows = [
      {
        index: 1,
        name: "Frozen Yogurt",
      },
      {
        index: 2,
        name: "Ice cream sandwich",
      },
      {
        index: 3,
        name: "Eclair",
      },
      {
        index: 4,
        name: "Cupcake",
      },
      {
        index: 5,
        name: "Gingerbread",
      },
    ];
    return {
      colums,
      rows,
      pagination: ref({
        rowsPerPage: 0,
      }),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>