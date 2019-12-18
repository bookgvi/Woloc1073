<template lang="pug">
  .extras
    .menu.menu--menu2
      filters-list(name="settings")
        template(#prepend="props")
          studio-filter(v-bind="props")
    .content--content2
      .row
        ExtrasTable
</template>

<script>
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
import ExtrasTable from './Table'
export default {
  name: 'setting',
  components: {
    StudioFilter,
    FiltersList,
    ExtrasTable
  }
}
</script>
