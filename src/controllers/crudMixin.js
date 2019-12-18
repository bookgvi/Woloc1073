import api from '../api'

export default {
  data () {
    return {
      loading: {
        list: false,
        one: false
      },
      pageName: this.$options.name,
      list: [],
      calendarList: []
    }
  },
  watch: {
    'loading.list' (v) {
      if (v) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    },
    'loading.one' (v) {
      if (v || this.loading.list) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    }
  },
  methods: {
    async getAll (page, filter) {
      this.loading.list = true
      const { data } = await api[this.pageName].getAll(page, filter)
      if (data) {
        this.list = data.items || data
        this.loading.list = false
      }
      return data
    },
    async getOne (id) {
      this.loading.one = true
      const { data } = await api[this.pageName].getOne({ id })
      if (data) {
        this.loading.one = false
        return data
      }
      this.loading.one = false
    },
    async addNew (payload) {
      this.loading.one = true
      this.idOfJustAdded = 0
      const res = await api[this.pageName].addNew(payload)
      if (res) {
        this.idOfJustAdded = res.id
        return res
      }
      this.loading.one = false
    },
    async updateOne (payload) {
      this.loading.one = true
      const res = await api[this.pageName].updateOne(payload)
      if (res) {
        this.idOfJustAdded = res.id
        return res
      }
      this.loading.one = false
    },
    async deleteOne (id) {
      this.loading.one = true
      const res = await api[this.pageName].deleteOne({ id })
      if (!res) {
        this.loading.one = false
      }
      return res
    }
  }
}
