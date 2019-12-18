<template lang="pug">
  .q-pa-none(
    v-if="rerender"
  )
    .menu
      filters-list(name="calendar" )
        template(#prepend="props")
          studio-filter(v-bind="props")
          rooms-filter(v-bind="props")
          events-filter(v-bind="props")
          price-filter(v-bind="props")
    .content
      CalendarSheet(
        :filter="filterComp"
        :bookings="$app.bookings.calendarList"
        @isAllDayChange="isAllDay = $event"
      )
</template>

<script>
import CalendarSheet from './Sheet'
import FiltersList from '../Filters/FiltersList'
import StudioFilter from '../Filters/StudioFilter'
import RoomsFilter from '../Filters/RoomsFilter'
import EventsFilter from '../Filters/EventsFilter'
import PriceFilter from '../Filters/PriceFilter'
import { date } from 'quasar'

export default {
  name: 'Calendar',
  data () {
    return {
      rerender: true,
      isAllDay: true
    }
  },
  computed: {
    firstStudio () {
      if (!this.$app.studios.firstStudio || !this.$app.studios.firstStudio.id) return 0
      return this.$app.studios.firstStudio.id
    },
    filterComp () {
      return this.filterInit()
    }
  },
  methods: {
    filterInit () {
      if (this.$app.filters.getValues('calendar').studio &&
          this.$app.filters.getValues('calendar').studio !== 0) {
        return this.$app.filters.getValues('calendar')
      }
      const params = {
        studio: this.firstStudio,
        rooms: this.$app.rooms.getAvailable({ studio: this.firstStudio }).map(item => {
          return item.id
        }),
        events: ['photo', 'video', 'event'],
        price: { min: 0, max: 999999 },
      }
      this.$app.filters.setValue('calendar', 'studio', params.studio)
      this.$app.filters.setValue('calendar', 'rooms', params.rooms)
      this.$app.filters.setValue('calendar', 'events', params.events)
      this.$app.filters.setValue('calendar', 'price', params.price)
      this.setWeekRange()
      return this.$app.filters.getValues('calendar')
    },
    setWeekRange () {
      const currentDate = new Date()
      const fromMonday = currentDate.getDay() - 1
      const toSunday = 7 - currentDate.getDay()
      const currentDateMS = +currentDate
      const fromMondayMS = currentDateMS - 24 * fromMonday * 1000 * 3600
      const toSundayMS = currentDateMS + 24 * toSunday * 1000 * 3600
      this.$app.filters.setValue('calendar', 'dateRangeFrom', date.formatDate(new Date(fromMondayMS), 'YYYY-MM-DD'))
      this.$app.filters.setValue('calendar', 'dateRangeTo', date.formatDate(new Date(toSundayMS), 'YYYY-MM-DD'))
    }
  },
  components: { EventsFilter, FiltersList, RoomsFilter, StudioFilter, PriceFilter, CalendarSheet }
}
</script>

<style scoped>
</style>
