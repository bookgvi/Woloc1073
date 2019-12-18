<template lang="pug">
  .row.col-12.justify-center.q-py-md.q-gutter-md
      q-btn.col-5.text-body2.text-weight-bold.text-grey-7(
        no-caps
        @click="cancelBooking"
        color="negative"
        label="Отменить"
        outline
      )
      q-btn.col-5.text-body2.text-weight-bold.bg-primary.text-white(
        no-caps
        @click="saveBooking"
        color="positive"
        label="Сохранить"
        outline
      )
</template>

<script>
export default {
  name: 'CalendarApply',
  methods: {
    cancelBooking () {
      this.$emit('setQueryState', false)
    },
    async saveBooking () {
      await this.applyBooking()
    }
  },
  props: ['applyBooking']
}
</script>

<style scoped>

</style>
