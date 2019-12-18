<template lang="pug">
  filter-select(
    selectAllLabel="Все статусы"
    :title="buttonTitle"
    :options="options"
    :value="value"
    @change="event => onChange('purposes', event)"
  )
</template>

<script>
import FilterSelect from './FilterSelect'
import { FINANCES_PURPOSES } from 'src/common/constants'

export default {
  name: 'finances-purposes-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  data: () => ({
    options: []
  }),
  mounted () {
    this.options = Object.values(FINANCES_PURPOSES)
  },
  computed: {
    value () {
      return this.values.purposes || []
    },
    buttonTitle () {
      return `Тип записи ${this.value.length || ''}`
    },
  }
}
</script>
