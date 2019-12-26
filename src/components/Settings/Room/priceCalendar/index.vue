<template lang="pug">
  .q-pa-lg
    .row.q-pb-lg
      .col-11
        .text-h6 Календарь цен ({{ price | priceView }})
      q-space
      .col-1
        q-btn(icon="close" flat @click="$emit('hide')")
    .row.q-pb-lg
      .col-6.q-pr-sm.column.justify-end
        div
          q-btn(icon="photo_camera" @click="price = 'photo'")
          q-btn(icon="videocam"  @click="price = 'video'")
          q-btn.q-mr-md(icon="local_play"  @click="price = 'event'")
      .col-6
        span Вместимость зала, человек
        q-input(v-model="payment[price]['maxSeats']" outlined dense)
    .row.q-pb-lg.items-end
      .col.q-pr-sm
        span Гости без доплаты
        q-input(v-model="payment[price]['seats']" outlined dense)
      .col.q-pr-sm
        span Доплата за след, р/час
        q-input(v-model="payment[price]['seatPrice']" outlined dense)
      .col.q-pr-sm
        span Скидка "За день"
        q-input(v-model="payment[price]['discountTomorrow']" outlined dense)
          template(#append)
            span(style="font-size: 1rem") %
      .col
        span Скидка "День в день"
        q-input(v-model="payment[price]['discountToday']" outlined dense)
          template(#append)
            span(style="font-size: 1rem") %
    .row.q-pb-sm
      q-checkbox(label="Наценка на единственный час" v-model="markup")
    .row.q-pb-lg
      .col
        extraCharge.q-pb-xl(v-if="markup" :payment="payment[price]['pricesForHour']")
        dayPrices(:price="price" :payment="payment[price]['prices']")
    // .row.q-pb-lg.justify-center
      .col-5
        q-btn.bg-primary.text-white(label="Сохранить и закрыть окно" @click="$emit('hide')" style="width: 100%;")
</template>

<script>
import extraCharge from './extraCharge'
import dayPrices from './dayPrices'
export default {
  name: 'priceCalendar',
  components: { extraCharge, dayPrices },
  props: {
    payment: {
      type: Object,
      default: _ => {}
    }
  },
  data () {
    return {
      price: 'photo',
      markup: false
    }
  },
  filters: {
    priceView (value) {
      const result = [{ 'photo': 'Фото' }, { 'video': 'Видео' }, { 'event': 'Событие' }].filter(item => item[value])[0]
      return result[value]
    }
  }
}
</script>

<style scoped>

</style>
