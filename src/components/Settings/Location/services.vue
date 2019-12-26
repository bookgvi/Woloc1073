<template lang="pug">
  .services
    h6.q-mb-md Удобства и услуги
    .col.q-pl-md
      .row.q-pb-md
        .col-6(v-for="(item, index) in singleStudio.services" :key="index")
          q-checkbox.q-pb-md(
            v-model="item.presentsInStudio"
            :label="item.name"
            dense
          )
</template>

<script>
export default {
  props: {
    singleStudio: Object
  },
  data () {
    return {
      isChecked: []
    }
  }
}
</script>
