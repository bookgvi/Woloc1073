<template lang="pug">
  .withdraw
    .row.justify-center.q-pt-md
      .text-h5.text-bold Подтвердите вывод средств
    .row.justify-center.q-py-md
      q-btn.bg-primary.text-white.q-mr-md(label="Подтвердить" @click="hasConfirmed")
      q-btn.bg-green.text-white(label="Отменить" @click="$emit('hasWithdraw')")
</template>

<script>
import { finances } from '../../../api/finances'
export default {
  name: 'index',
  methods: {
    async hasConfirmed () {
      await finances.withdraw()
      this.$emit('hasWithdraw')
    }
  }
}
</script>

<style scoped>

</style>
