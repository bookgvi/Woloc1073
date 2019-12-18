import api from 'src/api'
import crudMixin from '../crudMixin'

export default {
  name: 'bookings',
  data () {
    return {
      calendarList: [],
      rawCalendarList: [],
      eventsFilteredCalendarList: [],
      oldMainCalendarFilterProps: '',
      oldEventsFilterProp: '',
      dashboardBookingsList: [],
      idOfJustAdded: 0,
      dashboardBookingsShareList: [],
      dashboardBookingsProfitList: [],
      calendarPriceFilter: {
        min: 0,
        max: 999999
      }
    }
  },
  mixins: [crudMixin],
  methods: {
    findPriceFilterValues (array) {
      this.calendarPriceFilter = Object.assign({ min: 0, max: 999999 })
      array.forEach(({ price, technical }) => {
        if (!technical) {
          const intPrice = Number(price)
          this.calendarPriceFilter.min = (this.calendarPriceFilter.min > 0) ? intPrice : this.calendarPriceFilter.min
          this.calendarPriceFilter.max = (this.calendarPriceFilter.max === 999999) ? intPrice : this.calendarPriceFilter.max
          this.calendarPriceFilter.min = (intPrice < this.calendarPriceFilter.min) ? intPrice : this.calendarPriceFilter.min
          this.calendarPriceFilter.max = (intPrice > this.calendarPriceFilter.max) ? intPrice : this.calendarPriceFilter.max
        }
      })
    },
    async getForCalendar (filter) {
      this.loading.list = true
      const res = await api.bookings.getForCalendar(filter)
      if (res) {
        this.rawCalendarList = res.data.items
        // console.log(res)
      }
      this.loading.list = false
    },
    filterByEvents (array, events) {
      this.eventsFilteredCalendarList = array.filter(item => {
        if (events.indexOf(item.eventType) !== -1 || item.technical) {
          return item
        }
      })
    },
    filterByPrice (array, price) {
      return array.filter(item => {
        const min = price.min
        const max = price.max
        if (item.price >= min && item.price <= max) {
          return item
        }
        if (item.technical) {
          return item
        }
      })
    },

    async calendarFilters (filter, forceUpdate = true) {
      const mainCalendarFilterProps = Object.assign({}, {
        dateFrom: filter.dateFrom,
        dateTo: filter.dateTo,
        studio: filter.studio,
        rooms: filter.rooms
      })
      let updated = false
      if (forceUpdate || !this.rawCalendarList || this.oldMainCalendarFilterProps !== JSON.stringify(mainCalendarFilterProps)) {
        await this.getForCalendar(filter)
        updated = true
      }
      this.oldMainCalendarFilterProps = JSON.stringify(mainCalendarFilterProps)
      let array = [...this.rawCalendarList]
      const eventsFilterProp = [...filter.events]
      if (updated || forceUpdate || !this.eventsFilteredCalendarList ||
        this.oldEventsFilterProp !== JSON.stringify(eventsFilterProp)) {
        this.filterByEvents(array, filter.events)
        updated = true
      }
      let filteredList = [...this.eventsFilteredCalendarList]
      this.oldEventsFilterProp = JSON.stringify(eventsFilterProp)

      if (updated === true || filter.price.max === -1) {
        this.findPriceFilterValues(filteredList)
      }
      filteredList = this.filterByPrice(filteredList, filter.price)
      this.calendarList = filteredList
    },

    async getForDashBoard (filter) {
      this.loading.list = true
      const res = await api.bookings.getForCalendar(filter)
      if (res) {
        this.dashboardBookingsList = res.data.items
      }
      this.loading.list = false
    },
    async dashboardBookingsShare (payload) {
      this.loading.list = true
      const res = await api.bookings.dashboardBookingsShare(payload)
      if (res) {
        this.dashboardBookingsShareList = res.data
      }
      this.loading.list = false
    },

    async dashboardBookingsProfit (payload) {
      this.loading.list = true
      const res = await api.bookings.dashboardBookingsProfit(payload)
      if (res) {
        this.dashboardBookingsProfitList = res.data
      }
      this.loading.list = false
    },

    async addNewTechnical (payload) {
      this.loading.one = true
      this.idOfJustAdded = 0
      const res = await api.bookings.addNewTechnical(payload)
      if (res) {
        this.idOfJustAdded = res.id
      }
      this.loading.one = false
    },

    calendarGetObjById (id) {
      return this.calendarList.find(item => item.id === id) || {}
    },
    calendarGetIndexById (id) {
      return this.calendarList.findIndex(item => item.id === id)
    }
  }
}
