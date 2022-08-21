<template>
    <div class="q-pa-lg flex flex-center">
        <q-pagination
            v-model="model"
            :max="pageCount"
            :max-pages="10"
            :boundary-numbers="false"
            @update:model="pageChange(value)"
            v-if="isShowPagging"
          />
    </div>
</template>

<script>
// nếu dùng các hàm như mouted thì mới dùng được biến this

import { defineComponent, ref, watch } from "vue";
export default defineComponent({
    name:"pager",
    props: ['pageIndex', 'pageSize', 'total'],
    setup(props, { emit }){
        const model = ref(props.pageIndex);
        watch(model, (val) => {
            emit('update', val);
        });
        return{
            model,
            isShowPagging : props.total > props.pageSize,
            pageIndex: props.pageIndex,
            pageCount: Math.ceil(props.total / props.pageSize )
        }
    }
})
</script>

<style lang="scss" scoped>

</style>