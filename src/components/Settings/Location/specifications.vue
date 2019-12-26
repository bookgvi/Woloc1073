<template lang="pug">
  .specifications
    h6.q-mb-md Характеристики
    .row.q-pb-lg
      .col
        span Описание локации
        textarea.q-pa-sm.text-grey-8(v-model="singleStudio.description" rows=5 style="width: 100%;")
    .row.q-pb-sm.items-end
      .col.q-pr-sm
        span Лимит, недели &nbsp
        span.text-red *
        q-input(
          class="limit"
          v-model="singleStudio.limit"
          mask="#####"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          unmasked-value
          outlined
          dense
        )
      .col.q-pr-sm
        span Высота потолков, м &nbsp
        span.text-red *
        q-input(
          class="height"
          v-model="singleStudio.height"
          mask="#####"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          unmasked-value
          outlined
          dense
        )
      .col
        span(style="line-height: 0;") Площадь,
        span.text-red * &nbsp
        span м
          sup 2
        q-input(
          class="yardage"
          v-model="singleStudio.yardage"
          mask="#####"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          unmasked-value
          outlined
          dense
        )
    .row.q-pb-lg
      p Насколько недель вперед возможна бронь.
</template>

<script>
export default {
  name: 'specifications',
  props: {
    singleStudio: Object
  }
}
</script>

<style scoped>

</style>
