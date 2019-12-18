<template lang="pug">
  .extraCharge
    .row
      .col(v-for="(item, index) in columns" :key="index")
        p(style="text-align: center;") {{ item.label }}
    .row
      .col
        q-input.q-pa-xs(value="" label="на час" outlined disable)
      .col(v-for="(item2, index2) in payment")
        q-input.q-pa-xs(v-model="payment[index2].value" outlined)

</template>

<script>
export default {
  name: 'extraCharge',
  props: {
    payment: {
      type: Array,
      default: _ => {
      }
    }
  },
  data () {
    return {
      columns: [
        {
          name: 'charge',
          field: 'charge',
          label: 'Наценка',
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
  mounted () {
  }
}
</script>

<style scoped>

</style>
