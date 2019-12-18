<template lang="pug">
  .roomFilter
    q-btn.q-py-none.q-px-sm(
      :label="buttonTitle",
      no-caps
      flat
      dense
      style="border: 1px solid black;"
    )
    q-popup-proxy(
      ref="QPopupProxy"
      transition-show="scale"
      transition-hide="scale"
    )
      .row
        .col
          .text-subtitle1.text-bold.q-pt-md.q-px-lg {{ title }}
          .row.q-pl-lg.q-pt-md(v-for="(item, index) in models")
            input.check__input.q-mt-xs(
              :id="`checkbox${index}`"
              type="checkbox"
              v-model="selectedRooms[item.id]"
              :key="reloadCheckBox"
            )
            .check__box1.cursor-pointer(@click="checkUncheck(item.id)")
            .check__box.cursor-pointer(@click="checkUncheck(item.id)" :style="{ backgroundColor: `#${item.color}`, opacity: 0.3 }")
            label.check.check__label.cursor-pointer(:for="`checkbox${index}`") {{ models[index].name }}
          .row.q-pl-lg.q-pt-md
            input.check__input.q-mt-xs(
              id="checkboxAll"
              type="checkbox"
              v-model="selectedAllRooms"
            )
            .check__box1.cursor-pointer(@click="selectedAllRooms = !selectedAllRooms")
            .check__box.cursor-pointer(@click="selectedAllRooms = !selectedAllRooms")
            label.check.check__label.cursor-pointer(for="checkboxAll") Все залы

          .row
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
  name: 'rooms-filter',
  props: {
    values: {
      type: Object,
    }
  },
  data () {
    return {
      selectedAll: false,
      selectedRooms: {},
      reloadCheckBox: 0
    }
  },
  watch: {
    models (newVal) {
      this.selection()
    }
  },
  computed: {
    title () {
      const studio = this.$app.studios.getFiltered(this.values)

      return studio && studio.name
    },
    value () {
      return this.values.rooms || []
    },
    buttonTitle () {
      return `Залы ${this.value.length || ''}`
    },
    models () {
      return this.$app.rooms.getAvailable(this.values)
    },
    selectedAllRooms: {
      get () {
        return this.selectedAll
      },
      set (val) {
        this.models.forEach(item => {
          this.selectedRooms[item.id] = val
        })
        this.selectedAll = val
      }
    }
  },
  created () {
    this.selection()
  },
  methods: {
    hidePopup () {
      this.$refs.QPopupProxy.hide()
    },
    async onApply () {
      const page = this.$route.path.split('/')[1]
      let filteredRooms = []
      for (let key in this.selectedRooms) {
        if (this.selectedRooms[key]) {
          filteredRooms.push(+key)
        }
      }
      await this.$app.filters.setValue(page, 'rooms', filteredRooms)
      this.hidePopup()
    },
    onReset () {
      this.hidePopup()
    },
    selection () {
      this.selectedRooms = Object.assign({})
      this.value.forEach(item => {
        this.selectedRooms[item] = true
      })
      if (this.value.length) this.selectedAll = true
    },
    checkUncheck (val) {
      this.selectedRooms[val] = !this.selectedRooms[val]
      this.reloadCheckBox++
    }
  }
}
</script>

<style>
  .check {
    padding-left: 2.2em;
  }
  .check__label {
  }
  .check__input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .check__box {
    position: absolute;
    width: 1.3em;
    height: 1.3em;
    border-radius: 2px;
    background-color: black;
  }
  .check__box1 {
    position: absolute;
    width: 1.3em;
    height: 1.3em;
    z-index: 9999;
  }
  .check__input:checked + .check__box1 {
    background-image: url('../../assets/check-18px.svg');
  }
</style>
