<template lang="pug">
  .specifications
    .row.q-pb-lg
      .col
        .text-h5.text-bold Характеристики
    .row.q-pb-lg
      .col
        span Описание зала
          textarea.q-pa-sm.text-grey-8(
            v-model="specification.description"
            type="textarea"
            rows=5
            style="width: 100%;"
          )
    .row.q-pb-lg(:key="reloadFields")
      .col.q-pr-sm
        span Высота потолков, м&nbsp;
        span.text-red *
        q-input(
          class="height"
          v-model="specification.height"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          outlined
          dense
        )
      .col
        span(style="line-height: 0;") Площадь, м
          sup 2
        span &nbsp;
        span.text-red *
        q-input(
          class="yardage"
          v-model="specification.yardage"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          outlined
          dense
        )
    abstract-list(:dataArray="specification.characteristics")

</template>

<script>
import AbstractList from './AbstractDataList/abstractList'
export default {
  name: 'specifications',
  components: { AbstractList },
  props: {
    specification: {
      type: Object
    },
    isRequired: Boolean
  },
  data: () => ({
    itemsCount: 6,
    roomHeight: 0,
    roomYardage: 0,
    roomDescription: '',
    isCharacteristics: true,
    reloadFields: 0
  }),
  watch: {
    'isRequired' (newVal) {
      if (newVal) this.reloadFields++
    }
  },
  created () {
    this.roomHeight = this.height
    this.roomYardage = this.yardage
    this.roomDescription = this.description
  }
}
</script>
