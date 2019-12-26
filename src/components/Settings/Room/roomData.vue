<template lang="pug">
  .roomData
    .row.q-pb-lg
      .col
        .text-h5.text-bold Данные зала
    .row.q-pb-lg
      .col
        span Локация
        q-input.q-pt-sm(v-model="currentStudioData" outlined dense disable)
    .row.q-pb-lg(:key="reloadFields")
      .col
        span Название зала&nbsp;
        span.text-red *
        q-input.q-pt-sm(
          class="name"
          v-model="roomData.name"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          outlined
          dense
        )
    .row.q-pb-md
      span Цвет зала в календаре
    .row.items-center.q-pb-md
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: #9C27B0;" @click="roomColorVM='#9C27B0'")
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: #21BA45;" @click="roomColorVM='#21BA45'")
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: #C10015;" @click="roomColorVM='#C10015'")
      .inline-block.q-mr-sm(style="width: 30px; height: 30px; cursor: pointer; background: #31CCEC;" @click="roomColorVM='#31CCEC'")
      .inline-block.q-mr-xl(style="width: 30px; height: 30px; cursor: pointer; background: #F2C037;" @click="roomColorVM='#F2C037'")
      .row.q-pa-sm(style="border: 1px solid silver")
        .inline-block.q-mr-md(:style="{ width: '30px', height: '30px', background: `#${roomData.color}`}")
        q-icon.cursor-pointer(name="colorize" style="font-size: 2rem;")
          q-popup-proxy(:offset="[10, 10]")
            .block
              q-color(
                v-model="roomColorVM"
                no-footer
                style="width: 300px;"
              )
    .row.q-pb-md
      .col-4.q-pr-sm
        span Статус
        q-select(v-model="roomStatus" :options="statuses" outlined dense)
      .col-4.q-pr-sm
        span Тип зала
        q-select(
          class="name"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          v-model="currentRoomType"
          :options="roomType"
          outlined
          dense
        )
      .col-4.q-pr-sm
        span Мин. кол-во часов&nbsp;
        span.text-red *
        q-input(
          class="minHours"
          v-model="roomData.minHours"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          outlined
          dense
        )
    .row.q-pb-md
      span Опубликован и доступен для бронирования
    .row.q-pb-sm
      span Предоплата
    .row.q-pb-lg
      .col-7.q-pr-sm
        q-select(
          class="needPrepayment"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          v-model="needPrepayment"
          :options="prepay"
          outlined
          dense
        )
</template>

<script>
export default {
  name: 'roomData',
  props: {
    currentStudio: {
      type: Object
    },
    roomData: {
      type: Object
    }
  },
  data: () => ({
    currentStudioName: '',
    roomStatusData: 'Открыт',
    statuses: ['Скрыт', 'Открыт', 'Закрыт'],
    currentRoomTypeData: 'Рабочий',
    roomType: ['Гримерка или подсобка', 'Рабочий'],
    currentPrepay: 'На выбор клиента',
    prepay: ['Без предоплаты', 'На выбор клиента'],
    reloadFields: 0
  }),
  watch: {
    'isRequired' (newVal) {
      if (newVal) this.reloadFields++
    }
  },
  computed: {
    currentStudioData: {
      get () {
        return this.currentStudioName
      },
      set () {
        this.currentStudio.name = this.currentStudioName
      }
    },
    roomStatus: {
      get () {
        return this.roomStatusData
      },
      set (val) {
        this.roomStatusData = val
        this.roomData.status = this.statuses.indexOf(val)
      }
    },
    currentRoomType: {
      get () {
        return this.currentRoomTypeData
      },
      set (val) {
        this.currentRoomTypeData = val
        this.roomData.isRoom = this.roomType.indexOf(val)
      }
    },
    needPrepayment: {
      get () {
        return this.currentPrepay
      },
      set (val) {
        this.currentPrepay = val
        this.roomData.needPrepayment = this.prepay.indexOf(val)
      }
    },
    roomColorVM: {
      get () {
        return `#${this.roomData.color}`
      },
      set (val) {
        val = val.split('#').pop()
        this.roomData.color = val
      }
    }
  },
  mounted () {
    this.defaultValues()
  },
  methods: {
    defaultValues () {
      this.currentStudioName = this.currentStudio.name
      this.roomStatusData = this.statuses[this.roomData.status]
      this.currentRoomTypeData = this.roomType[this.roomData.isRoom]
      this.currentPrepay = this.prepay[this.roomData.needPrepayment]
    }
  }
}
</script>
