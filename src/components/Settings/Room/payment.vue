<template lang="pug">
  .payment
    .row.q-pb-lg
      .col
        .text-h5.text-bold.q-pb-md Оплата
        q-btn.bg-primary.text-white(label="Открыть календарь цен" no-caps @click="isModal = true")
      q-dialog(v-model="isModal")
        q-card
          q-card-section
            priceCalendar(@hide="isModal = false" :payment="payment")
</template>

<script>
import priceCalendar from './priceCalendar/index.vue'
export default {
  name: 'payment',
  components: { priceCalendar },
  props: {
    payment: {
      type: Object,
      default: _ => {}
    }
  },
  data: () => ({
    isModal: false
  })
}
</script>

<style>
  .q-dialog__inner--minimized > div {
    max-width: 1024px;
  }</style>
