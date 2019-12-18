<template lang="pug">
  .jswidget.q-pt-lg
    .row.q-pb-md.justify-center
      .col-6
        .row.q-pb-md
          .text-h5 JS Widget
        .row.q-pb-xs
          .col.q-pr-sm
            span Локация
          .col
            span Залы
        .row.q-pb-md
          .col.q-pr-sm
            q-select(v-model="currentStudioVM" :options="studiosNames" outlined dense)
          .col
            q-select(v-model="roomSelectorVM" :options="singleRoomOrAllRooms" outlined dense)
        .row.q-pb-xs
          .col.q-pr-sm
            span Выбранный зал
          .col
            span Источник бронирования
        .row.q-pb-md
          .col.q-pr-sm
            q-input(v-if="!isSingleOrAllRoom[0] && !isSingleOrAllRoom[1]" value="" outlined dense disable)
            q-input(v-if="isSingleOrAllRoom[0]" :value="currentRoomName" outlined dense disable)
            q-select(v-if="isSingleOrAllRoom[1]" v-model="currentRoomVM" :options="roomsNames" outlined dense)
          .col
            q-select(v-model="bookingSourceVM" :options="bookingSourceArray" outlined dense)

        .row.q-pb-md
          .col
            q-btn.bg-primary.text-white(
              label="Сгенерировать код"
              @click="generate"
              style="width: 100%;"
              no-caps
            )
        .row.q-pb-xs.justify-around
          .col.q-pr-sm
            span Код для вставки
          .col.q-pr-sm
            .text-primary.cursor-pointer(@click="copyWidget" style="text-align: right;") Скопировать
        .row.q-pb-md
          .col
            textarea.jswidgetArea.q-pa-sm.text-grey-8(v-model="newWidgetCode" :rows="rowsForWidget" style="width: 100%;")

</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      allStudiosAndRooms: [],
      currentStudioName: '',
      currentRoomName: '',
      roomSelector: '',
      bookingSource: '',
      roomsNames: [],
      studiosNames: [],
      singleRoomOrAllRooms: ['Один зал', 'Все залы'],
      bookingSourceArray: ['Вконтакте', 'Инста', 'Level', 'Facebook'],
      currentRoomId: 1,
      newWidgetCode: '',
      rowsForWidget: 3,
      isSingleOrAllRoom: false
    }
  },
  computed: {
    currentStudioVM: {
      get () {
        return this.currentStudioName
      },
      set (val) {
        this.currentStudioName = val
        this.currentRoomVM = ''
        this.currentRoomId = ''
        this.roomsNames = []
        if (!this.allStudiosAndRooms) return
        const [{ rooms }] = this.allStudiosAndRooms.filter(item => item.name === val)
        if (!rooms.length) return
        this.currentRoomVM = rooms[0].name
        this.currentRoomId = rooms[0].id
        this.roomsNames = rooms.map(item => item.name)
      }
    },
    currentRoomVM: {
      get () {
        return this.currentRoomName
      },
      set (val) {
        this.currentRoomName = val
        this.allStudiosAndRooms.map(item => item.rooms.forEach(item2 => {
          if (item2.name === val) this.currentRoomId = item2.id
        }))
      }
    },
    roomSelectorVM: {
      get () {
        return this.roomSelector
      },
      set (val) {
        this.roomSelector = val
        this.isSingleOrAllRoom = this.singleRoomOrAllRooms.map(item => item === val)
      }
    },
    bookingSourceVM: {
      get () {
        return this.bookingSource
      },
      set (val) {
        this.bookingSource = val
      }
    }
  },
  async created () {
    const { items } = await this.$app.studios.getAll()
    this.allStudiosAndRooms = items
    this.currentStudioName = items[0].name
    this.studiosNames = items.map(item => item.name)
    this.currentRoomName = items[0].rooms[0].name
    this.currentRoomId = items[0].rooms[0].id
    this.roomsNames = items[0].rooms.map(item => item.name)
  },
  methods: {
    async generate () {
      if ((!this.isSingleOrAllRoom[0] && !this.isSingleOrAllRoom[1]) || !this.bookingSourceVM) {
        this.showNotif('Выберите зал, Источник бронирования и нажмите Сгенерировать код', 'orange')
        return
      }
      const result = await this.$app.jswidget.getOne(this.currentRoomId)
      if (result !== 'error') {
        this.rowsForWidget = 30
        const begin = result.slice(0, 11) + this.bookingSource
        const middle = result.slice(10, -16)
        const end = this.bookingSource + result.slice(-17)
        this.newWidgetCode = begin + middle + end
        this.showNotif('Виджет сгенерирован', 'primary')
      } else {
        this.newWidgetCode = ''
        this.rowsForWidget = 3
        this.showNotif('При генерации виджета возникла ошибка')
      }
    },
    copyWidget () {
      const widgetNode = document.querySelector('.jswidgetArea')
      widgetNode.focus()
      widgetNode.select()
      try {
        document.execCommand('copy')
        this.showNotif('Код виджета скопирован в буфер обмена', 'green')
      } catch (err) {
        console.error(`Can't copy`)
      }
    },
    showNotif (msg, clr = 'purple') {
      this.$q.notify({
        message: msg,
        color: clr
      })
    }
  }
}
</script>

<style scoped>

</style>
