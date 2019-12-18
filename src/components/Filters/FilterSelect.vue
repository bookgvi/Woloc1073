<template lang="pug">
  q-btn.q-py-none.q-px-sm(
    outline
    no-caps
    dense
    :label="title"
    :disabled="disabled"
  )
    q-popup-proxy(
      ref="QPopupProxy"
      transition-show="scale"
      transition-hide="scale"
    )
      slot
      q-field.row.col-12.text-body2.q-ml-sm.q-px-md.q-pt-lg(
        v-if="isRange"
        borderless
        style="width: 80%;"
      )
        q-range(
          v-model="currentValue"
          label-always
          markers
          :min="range.min"
          :max="range.max"
          :step="step"
          color="green"
        )
      q-option-group.text-body2.q-px-md.q-pt-md(
        v-else
        color="black"
        :type="type"
        :options="listOptions"
        v-model="currentValue"
      )
      .text-body2.q-px-md
        q-checkbox(
          v-if="selectAllLabel"
          :label="selectAllLabel"
          :value="selectAllState"
          @input="toggleSelectAll"
        )
      q-btn-group.q-pa-md(outline)
        q-btn.q-mr-md(
          label="Отменить"
          no-caps
          :style="{ border: '#f0f0f0 solid 1px' }"
          @click="onReset"
        )
        q-btn(
          label="Применить"
          color="primary"
          no-caps
          @click="onApply"
        )
</template>

<script>
export default {
  name: 'filter-select',
  data: () => ({
    currentValue: [],
  }),
  created () {
    this.currentValue = this.value
  },
  props: {
    title: String,
    selectAllLabel: String,
    isRange: Boolean,
    models: Array,
    options: Array,
    type: {
      type: String,
      default: 'checkbox'
    },
    value: {
      validator (prop) {
        return prop === null || prop instanceof Array || typeof prop === 'number' || prop instanceof Object
      },
    },
  },
  computed: {
    range () {
      if (!this.isRange) return
      if (!this.$app.bookings || !this.$app.bookings.calendarPriceFilter) {
        return {
          min: 0,
          max: 999999
        }
      }
      return {
        min: this.$app.bookings.calendarPriceFilter.min,
        max: this.$app.bookings.calendarPriceFilter.max
      }
    },
    step () {
      const diff = this.range.max - this.range.min
      if (diff === 0 || this.range.max === 999999) return 0
      return Math.ceil(diff / 20 / 100) * 100
    },
    listOptions () {
      if (this.isRange === true) return {}
      return this.options || this.models.map(({ id, name, color }) => ({
        value: id,
        label: name,
      }))
    },
    disabled () {
      if (this.isRange === true) {
        if (this.currentValue.max === this.currentValue.min) return true
        if (this.currentValue.max === 999999) return true
        return false
      }
      return !this.listOptions.length
    },
    selectAllState () {
      const { length } = this.currentValue

      if (!length) return false
      if (length === this.listOptions.length) return true

      return null
    }
  },
  methods: {
    hidePopup () {
      this.$refs.QPopupProxy.hide()
    },
    onApply () {
      this.$emit('change', this.currentValue)
      this.hidePopup()
    },
    onReset () {
      this.currentValue = this.value
      this.hidePopup()
    },
    toggleSelectAll (selected) {
      this.currentValue = selected
        ? this.listOptions.map(({ value }) => value)
        : []
    }
  },
  watch: {
    value (value) {
      this.currentValue = value
    },
    range (value) {
      this.$emit('change', value)
    },
  },
}
</script>
