import { defaultValues } from './defaultValues.js'
export default {
  name: 'filters',
  data () {
    return {
      values: {}
    }
  },
  created () {
    this.values = Object.assign({}, defaultValues)
    this.readFromSession()
  },
  methods: {
    readFromSession () {
      const { filters } = sessionStorage

      if (filters) this.values = JSON.parse(filters)
      return this.values
    },
    saveToSession () {
      sessionStorage.filters = JSON.stringify(this.values)
    },
    getValues (page) {
      return this.values[page] || {}
    },
    setValue (page, name, value) {
      const { values } = this

      this.values = {
        ...values,
        [page]: {
          ...(values[page] || []),
          [name]: value
        }
      }
      this.saveToSession()
    },
    filterCustomer (id) {
      this.readFromSession()
      this.values.bookings = { customer: id }
      this.saveToSession()
    },
    async reset (page) {
      const { values } = this
      const tempDateRangeFrom = values.calendar.dateRangeFrom
      const tempDateRangeTo = values.calendar.dateRangeTo
      const { items } = await this.$app.studios.getAll()
      let [{ rooms }] = items.filter(item => item.id === items[0].id)
      rooms = rooms.map(item => item.id)
      this.values = {
        ...values,
        [page]: defaultValues[page]
      }
      if (this.values[page].hasOwnProperty('studio')) {
        this.setValue(page, 'studio', items[0].id)
        this.setValue(page, 'rooms', rooms)
      }
      this.setValue('calendar', 'dateRangeFrom', tempDateRangeFrom)
      this.setValue('calendar', 'dateRangeTo', tempDateRangeTo)
      this.saveToSession()
    }
  }
}
