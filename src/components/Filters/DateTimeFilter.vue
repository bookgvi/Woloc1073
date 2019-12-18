<template lang="pug">
  .dateTime
    .row
      .col
        q-btn.q-py-none(
          label="Дата/Время"
          @click="openFilter = true"
          dense
          no-caps
          flat
          style="border: 1px solid black;"
        )
          q-icon.q-px-sm(
            v-if="dateRange.start || rangeTime.min || +rangeTime.max !== 23"
            name="event"
            class="cursor-pointer"
          )
        q-popup-proxy(
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        )
          .row
            .col.q-pt-md.q-px-md(style="min-width: 400px;")
              VueCtkDateTimePicker.q-pt-sm(
                v-model="dateRange"
                color="#81AEB6"
                format="YYYY-MM-DD"
                range
                no-shortcuts
                no-label
                inline
                :label="dateLabel"
              )
            .col.q-pt-md.q-px-md(style="min-width: 400px;")
              .row.q-pb-md
                .col
                  .text-h5 Интервал: {{ rangeTime.max - rangeTime.min + 1 }} ч.
              .row.justify-center
                .col(style="font-size: 1.2rem;")
                  span.q-px-md Начало:
                  q-input.inline-block.q-pa-none(:value="rangeTime.min" style="width: 4rem;" outlined dense readonly)
                  span.q-px-md Конец:
                  q-input.inline-block.q-pa-none(:value="rangeTime.max" style="width: 4rem;" outlined dense readonly)
              .row.q-pt-xl.justify-center
                .col-9
                  q-range(
                    v-model="rangeTime"
                    :min="0"
                    :max="23"
                    :step="1"
                    drag-range
                    :left-label-value="rangeTime.min + ':00'"
                    :right-label-value="rangeTime.max + ':00'"
                    label-always
                    markers
                    snap
                    color="#81AEB6"
                  )
          .row.justify-center
            .col.q-py-md.q-px-md(style="width: 100%;")
              q-btn(label="Сбросить" @click="resetDateTimeFilter" outlined style="width: 100%;")
            .col.q-py-md.q-px-md(style="width: 100%;")
              q-btn.text-white.bg-primary(
                label="Применить"
                @click="setDayTimeRangeHandler"
                style="width: 100%;"
              )
</template>

<script>
import { date } from 'quasar'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
export default {
  name: 'dateTime-filter',
  components: {
    VueCtkDateTimePicker
  },
  data: () => ({
    openFilter: true,
    dateRange: '',
    dateLabel: '',
    rangeTime: {
      min: 0,
      max: 23
    }
  }),
  created () {
    this.$root.$on('reloadFilterMethod', _ => {
      this.setDateRange(null, null)
      this.setTimeRange(0, 23)
    })
    const currentPage = this.$route.path.split('/')[1]
    const hourFrom = this.$app.filters.getValues(currentPage)['time[hourFrom]']
    const hourTo = this.$app.filters.getValues(currentPage)['time[hourTo]']
    const startedAt = this.$app.filters.getValues(currentPage)['date[startedAt]']
    const finishedAt = this.$app.filters.getValues(currentPage)['date[finishedAt]']
    this.setDateRange(startedAt, finishedAt)
    this.setTimeRange(hourFrom, hourTo)
  },
  methods: {
    setDayTimeRangeHandler () {
      const currentPage = this.$route.path.split('/')[1]
      const startedAt = date.formatDate(this.dateRange.start, 'YYYY-MM-DD')
      const finishedAt = date.formatDate(this.dateRange.end, 'YYYY-MM-DD')
      const hourFrom = this.rangeTime.min
      const hourTo = this.rangeTime.max
      this.$app.filters.setValue(currentPage, 'time[hourFrom]', hourFrom)
      this.$app.filters.setValue(currentPage, 'time[hourTo]', hourTo)
      this.$app.filters.setValue(currentPage, 'date[startedAt]', startedAt)
      this.$app.filters.setValue(currentPage, 'date[finishedAt]', finishedAt)
      this.$refs.qDateProxy.hide()
    },
    resetDateTimeFilter () {
      const currentPage = this.$route.path.split('/')[1]
      this.$app.filters.reset(currentPage)
      this.$refs.qDateProxy.hide()
      this.setDateRange(null, null)
      this.setTimeRange(0, 23)
    },
    setDateRange (startedAt, finishedAt) {
      this.dateRange = {
        'start': date.formatDate(startedAt, 'YYYY-MM-DD'),
        'end': date.formatDate(finishedAt, 'YYYY-MM-DD')
      }
    },
    setTimeRange (hourFrom, hourTo) {
      this.rangeTime = {
        'min': hourFrom,
        'max': hourTo
      }
    }
  }
}
</script>
