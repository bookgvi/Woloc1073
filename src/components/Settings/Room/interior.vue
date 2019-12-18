<template lang="pug">
  .interior
    .row.q-pb-lg
      .col
        .text-h5.text-bold Предметы интерьера
    abstract-list(:dataArray="interiors")
</template>

<script>
import AbstractList from './AbstractDataList/abstractList'
export default {
  name: 'specifications',
  components: { AbstractList },
  props: {
    interiors: {
      type: Array,
      default: _ => []
    }
  }
}
</script>
