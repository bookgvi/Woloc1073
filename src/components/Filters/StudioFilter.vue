<template lang="pug">
  filter-select(
    type="radio"
    :title="buttonTitle"
    :models="models"
    :value="value"
    @change="onInputChange"
  )
</template>

<script>
import FilterSelect from './FilterSelect'

export default {
  name: 'studio-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    filter: {
      type: Object
    },
    onChange: Function,
  },
  async created () {
    const { items } = await this.controller.getAll()
    const currentPage = this.$route.path.split('/')[1]
    const filter = this.$app.filters.readFromSession()[currentPage]
    if (filter.hasOwnProperty('studio') && filter.studio) return
    let [{ rooms }] = items.filter(item => item.id === items[0].id)
    rooms = rooms.map(item => item.id)
    this.$app.filters.setValue(currentPage, 'studio', items[0].id)
    this.$app.filters.setValue(currentPage, 'rooms', rooms)
  },
  computed: {
    controller () {
      return this.$app.studios
    },
    value () {
      return this.values.studio
    },
    models () {
      return this.controller.list
    },
    buttonTitle () {
      const studio = this.controller.getFiltered(this.values)

      return studio ? studio.name : 'Локация'
    },
  },
  methods: {
    onInputChange (event) {
      this.onChange('studio', event)
      const rooms = this.$app.rooms.getAvailable({ studio: event }).map(item => {
        return item.id
      })
      this.onChange('rooms', rooms)
    }
  }
}
</script>
