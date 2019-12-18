<template lang="pug">
  .dayPrices
    .row
      .col(v-for="(item, index) in columns" :key="index")
        p(style="text-align: center;") {{ item.label }}
    .row(v-for="(item2, index2) in payment")
      .col
        q-input.q-pa-xs(v-model="item2.time" outlined disable)
      .col(v-for="item3 in item2.days")
        q-input.q-pa-xs(v-model="item3.value" outlined)
</template>

<script>
export default {
  name: 'extraCharge',
  props: {
    payment: Array
  },
  data () {
    return {
      columns: [
        {
          name: 'time',
          field: 'time',
          label: 'Время',
          style: 'width: 10px'
        },
        {
          name: 'mon',
          field: 'mon',
          label: 'ПН'
        },
        {
          name: 'tue',
          field: 'tue',
          label: 'ВТ'
        },
        {
          name: 'wed',
          field: 'wed',
          label: 'СР'
        },
        {
          name: 'thu',
          field: 'thu',
          label: 'ЧТ'
        },
        {
          name: 'fri',
          field: 'fri',
          label: 'ПТ'
        },
        {
          name: 'sat',
          field: 'sat',
          label: 'СБ'
        },
        {
          name: 'sun',
          field: 'sun',
          label: 'ВС'
        }
      ]
    }
  },
}
</script>

<style scoped>
  .q-field--disabled .q-field__inner {
    cursor: pointer !important;
  }
</style>
