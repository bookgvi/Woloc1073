<template lang="pug">
  .data
    .row(v-if="showPart")
      // Модификация объекта!!!!!!!
      .col-6(v-for="(item, index) in dataArray" :key="index")
        q-checkbox(v-if="index < itemsCount" v-model="item.isChecked" :label="item.name")
    .row.q-pb-lg(v-if="showPart")
      .col.cursor-pointer(@click="showPart=!showPart")
        .text-h6.text-primary(
          v-if="isSomeItems"
        ) Показать ещё {{ dataArray.length - itemsCount < 0 ? isSomeItems = false : dataArray.length - itemsCount }}
    .row(v-if="!showPart")
      // Модификация объекта!!!!!!!
      .col-6(v-for="(item, index) in dataArray" :key="index")
        q-checkbox(v-model="item.isChecked" :label="item.name")
    .row.q-pb-lg(v-if="!showPart")
      .col.cursor-pointer(@click="showPart=!showPart")
        .text-h6.text-primary Скрыть
</template>

<script>
export default {
  name: 'abstractList',
  props: {
    dataArray: {
      type: Array,
      default: _ => []
    }
  },
  data: () => ({
    itemsCount: 8,
    isSomeItems: true,
    showPart: true
  })
}
</script>
