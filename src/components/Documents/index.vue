<template lang="pug">
  .documents
    .menu
      filters-list(name="documents")
        template(#prepend="props")
          date-time-filter(v-bind="props")
    .content
      DocumentsTable
</template>

<script>
import DocumentsTable from './Table/index.vue'
import StudioFilter from '../Filters/StudioFilter'
import RoomsFilter from '../Filters/RoomsFilter'
import FiltersList from '../Filters/FiltersList'
import DateTimeFilter from '../Filters/DateTimeFilter'
export default {
  components: {
    DocumentsTable,
    StudioFilter,
    RoomsFilter,
    FiltersList,
    DateTimeFilter
  }
}
</script>

<style scoped>

</style>
