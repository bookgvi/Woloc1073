<template lang="pug">
  .backgrounds
    .row.q-pb-lg
      .col
        .text-h5.text-bold Фоны
    abstract-list(:dataArray="backgrounds")
</template>

<script>
import AbstractList from './AbstractDataList/abstractList'
export default {
  name: 'specifications',
  components: { AbstractList },
  props: {
    backgrounds: {
      type: Array,
      default: _ => []
    }
  }
}
</script>
