import crudMixin from '../crudMixin'
import api from '../../api'

export default {
  name: 'organization',
  mixins: [crudMixin],
  methods: {
    async getOne () {
      this.loading.one = true
      const { data } = await api[this.pageName].getOne()
      if (data) {
        this.loading.one = false
        return data
      }
      this.loading.one = false
    }
  }
}
