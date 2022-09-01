<template>
  <q-page class="custom-q-page">
    <h5 class="text-h5 text-bold txt-title">Quản lý tài khoản</h5>
    <div class="contain-box">
      <div class="contain-box-filter row justify-end">
        <q-input
          v-model="request.textSearch"
          placeholder="Tìm kiếm"
          outlined
          :dense="true"
          @keyup.enter="getList"
        >
          <template v-slot:append>
            <q-icon name="search" @click="getList" />
          </template>
        </q-input>

        <q-btn
          class="q-ml-sm"
          color="primary"
          icon="add_circle_outline"
          label="Thêm mới"
        />
      </div>
      <div class="contain-box-body">
        <q-table
          row-key="index"
          :rows="rows.values"
          :separator="'cell'"
          hide-pagination
          :pagination="{rowsPerPage: 0}"
        >
          <template v-slot:header>
            <q-tr>
              <q-th class="text-center">STT</q-th>
              <q-th>Tên tài khoản</q-th>
              <q-th>Tên đầy đủ</q-th>
              <q-th>Email</q-th>
              <q-th>Số điện thoại</q-th>
              <q-th>Ngày tạo</q-th>
              <q-th class="text-center">Thao tác</q-th>
            </q-tr>
          </template>
          <template v-slot:body="{ row, rowIndex }">
            <q-tr>
              <q-td class="text-center">
                <b>{{
                  (request.pageIndex - 1) * request.pageSize + rowIndex + 1
                }}</b>
              </q-td>
              <q-td>{{ row.userName }}</q-td>
              <q-td>{{ row.fullName }}</q-td>
              <q-td>{{ row.email }}</q-td>
              <q-td>{{ row.numberPhone }}</q-td>
              <q-td>{{ $formatDate(row.createdDate, "DD/MM/YYYY") }}</q-td>
              <q-td class="text-center">
                <q-btn
                  padding="xs"
                  class="q-mr-sm"
                  color="yellow"
                  icon="mode"
                  title="Sửa"
                  @click="openEdit(row.userId)"
                />
                <q-btn
                  padding="xs"
                  class="q-mr-sm"
                  color="red"
                  icon="highlight_off"
                  title="Xóa"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <pager
          :pageIndex="request.pageIndex"
          :pageSize="request.pageSize"
          :total="totalRow"
          @update="onPageChange"
        />
        <edit v-if="isShowEdit" :id="editId" @close="isShowEdit = false" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, reactive } from "vue";
import edit from "components/users/edit.vue";
import { useQuasar } from "quasar";
import { getCurrentInstance } from "vue";

export default {
  components: {
    edit,
  },
  async setup() {
    const rows = reactive([]);
    const totalRow = ref(0);
    const isShowEdit = ref(false);
    const editId = ref("");
    const request = reactive({
      pageSize: 10,
      pageIndex: 1,
      textSearch: "",
      status: null,
    });

    const _this = getCurrentInstance().appContext.config.globalProperties;
    const $q = useQuasar();

    const getList = async () => {
      $q.loading.show({
        message: "Đang thực hiện, vui lòng chờ trong giây lát...",
        boxClass: "bg-grey-2 text-grey-9",
        spinnerColor: "primary",
      });
      const {data} = await _this.$userService.getList(request);
      rows.values = data.data;
      totalRow.value = data.totalData;
      $q.loading.hide();
    };
    const onPageChange = async (value) => {
      request.pageIndex = value;
      await getList();
    };
    const openEdit = (id) => {
      editId.value = id;
      isShowEdit.value = true;
    };
    const closeEdit = async (isReload) => {
      if (isReload) await getList();
      isShowEdit.value = false;
    };

    await getList();

    // return section
    return {
      rows,
      request,
      totalRow,
      isShowEdit,
      editId,
      onPageChange,
      getList,
      openEdit,
      closeEdit
    };
  },
};
</script>