<template lang="pug">
  .additional
    .row.q-pb-lg
      .col
        .text-h5.text-bold Доп. услуги
    abstract-list(:dataArray="extras")
</template>

<script>
import AbstractList from './AbstractDataList/abstractList'
export default {
  name: 'specifications',
  components: { AbstractList },
  props: {
    extras: {
      type: Array,
      default: _ => []
    }
  }
}
</script>
