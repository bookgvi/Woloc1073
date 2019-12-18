import api from '../../api'
import { sortBy } from 'lodash'
import crudMixin from '../crudMixin'

export default {
  name: 'finances',
  mixins: [crudMixin],
  data () {
    return {
      loading: {
        list: false,
        one: false
      },
      list: [],
      dashboardFinancesList: [],
    }
  },
  computed: {
    all () {
      return sortBy(this.list, 'title')
    }
  },
  methods: {
    async dashboardFinances (payload) {
      this.loading.list = true
      const res = await api.finances.dashboardFinances(payload)
      if (res) {
        this.dashboardFinancesList = res.data
      }
      this.loading.list = false
    },
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
      if (v) {
        this.$q.loading.show()
      } else if (this.loading.list) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    }
  }
}
