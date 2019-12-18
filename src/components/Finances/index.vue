<template lang="pug">
  .finances
    .menu
      filters-list(name="finances")
        template(#prepend="props")
          date-time-filter(v-bind="props")
          finances-purposes-filter(v-bind="props")
    .content
      FinancesTable
</template>

<script>
import DateTimeFilter from '../Filters/DateTimeFilter'
import FinancesTable from './Table/index'
import FiltersList from '../Filters/FiltersList'
import FinancesPurposesFilter from '../Filters/FinancesPurposesFilter'
export default {
  name: 'RefundsIndex',
  components: {
    FiltersList,
    FinancesPurposesFilter,
    FinancesTable,
    DateTimeFilter
  }
}
</script>

<style>
</style>
