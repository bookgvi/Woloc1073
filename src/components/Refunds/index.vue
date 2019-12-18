<template lang="pug">
  .refunds
    .menu
      filters-list(name="refunds" )
        template(#prepend="props")
          studio-filter(v-bind="props")
          rooms-filter(v-bind="props")
          status-filter(v-bind="props")
          date-time-filter(v-bind="props")
    .content
      RefundsTable
</template>

<script>
import RefundsTable from './Table/index'
import StudioFilter from '../Filters/StudioFilter'
import RoomsFilter from '../Filters/RoomsFilter'
import FiltersList from '../Filters/FiltersList'
import StatusFilter from '../Filters/StatusFilter'
import DateTimeFilter from '../Filters/DateTimeFilter'
export default {
  name: 'RefundsIndex',
  components: {
    FiltersList,
    RoomsFilter,
    StudioFilter,
    RefundsTable,
    StatusFilter,
    DateTimeFilter
  }
}
</script>

<style>
</style>
