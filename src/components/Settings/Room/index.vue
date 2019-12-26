<template lang="pug">
  .room
    .menu.menu--menu2
      filters-list(name="settings")
        template(#prepend="props")
          studio-filter(v-bind="props")
        template(#append)
          q-btn.q-btn--no-uppercase(label="Добавить зал" dense color="primary" @click="createNew")
    .content--content2(:key="filterChanged.studio")
      .row.q-py-md.q-pr-sm(:key="reloadData")
        .col-3.bg-white
          room-list(
            :rooms="rooms"
            @setCurrentRoom="setCurrentRoom"
            :selectedRoom="selectedRoom.id"
          )
        .col-6
          roomData(
            :currentStudio="currentStudio"
            :roomData="currentRoomData"
            :isRequired="isRequired"
          )
          Google(
            :roomData="currentRoomData"
          )
          specifications(
            :specification="currentRoomData"
            :isRequired="isRequired"
          )
          payment(
            :payment="currentRoomData.payment"
          )
          // -------------- TODO --------------------
          // images
          // ----------------------------------------
          interior(
            :interiors="currentRoomData.interiors"
          )
          backgrounds(
            :backgrounds="currentRoomData.backgrounds"
          )
          additionalServices(
            :extras="currentRoomData.extras"
          )
          // -------------- TODO --------------------
          // services(:singleStudio="singleStudio")
          // ----------------------------------------
          .row
            q-btn.fit.bg-primary.text-white(label="Сохранить" no-caps @click="saveChanges")
      q-dialog(v-model="isLeavePageDialog" persistent)
        q-card
          q-card-section.row.items-center
            q-icon(name="report" color="primary" text-color="white" style="font-size: 2rem;")
            span.q-ml-sm Вы покидаете страницу настроек зала! <br /> Все несохраненные данные будут утеряны.
          q-card-actions(align="right")
            q-btn.primary(label="ОК" color="primary" flat no-caps v-close-popup @click="leavePage")
            q-btn.primary(label="Отмена" color="primary" flat no-caps v-close-popup @click="isLeavePageConfirm = false")
</template>

<script>
import roomData from './roomData'
import Google from './Google'
import specifications from './specifications'
import payment from './payment'
import images from './images'
import interior from './interior'
import backgrounds from './backgrounds'
import additionalServices from './additionalServices'
import services from './services'
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
import RoomList from './roomList'
import { room } from '../../../api/room'
import { Util } from '../Helper/utils'

const emptyRoom = new Util()
export default {
  data () {
    return {
      createRoomAfterLocation: false,
      defaultStudio: {},
      defaultRooms: {},
      roomDataDefault: {},
      isPost: false,
      reloadData: 0,
      currentStudio: {},
      rooms: [],
      selectedRoom: {},
      currentRoomData: {},
      isRequired: false,
      isSomethingChanged: false,
      isLeavePageDialog: false,
      routerTo: '',
      routerFrom: ''
    }
  },
  components: {
    RoomList,
    StudioFilter,
    FiltersList,
    roomData,
    Google,
    specifications,
    payment,
    images,
    interior,
    backgrounds,
    additionalServices,
    services
  },
  watch: {
    async filterChanged () {
      await this.getStudioAndRoom()
      if (this.createRoomAfterLocation) {
        this.createNew()
      }
    }
  },
  computed: {
    filterChanged () {
      return this.$app.filters.getValues('settings')
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.path === '/settings/location' && to.query.createRoom) {
      next(vm => {
        vm.createRoomAfterLocation = true
      })
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.isSomethingChanged =
      this.isDefaultNotEqualCurrent(this.currentRoomData, this.roomDataDefault) ||
      this.isDefaultNotEqualCurrent(this.rooms, this.defaultRooms)
    if (this.isSomethingChanged) {
      this.isLeavePageDialog = true
      this.routerFrom = from
      this.routerTo = to
    } else {
      next()
    }
  },
  mounted () {
    window.addEventListener('keyup', e => {
      if (e.key === 'Escape' && this.createRoomAfterLocation) {
        this.getStudioAndRoom()
      }
    })
  },
  methods: {
    async getStudioAndRoom () {
      this.currentRoomData = {}
      let filter = this.$app.filters.getValues('settings')
      if (!filter.studio) return
      this.currentStudio = await this.$app.studios.getFiltered(filter)
      if (!this.currentStudio) return
      this.rooms = this.$app.rooms.getFiltered(filter)
      if (!this.rooms) return
      this.selectedRoom = this.rooms.length ? this.rooms[0] : {}
      if (this.selectedRoom.hasOwnProperty('id') && this.selectedRoom.id) {
        this.currentRoomData = await this.getRoomData(this.selectedRoom.id)
        this.saveDefaultData()
      }
      this.isPost = false
      this.reloadData++
    },
    async setCurrentRoom (room) {
      this.selectedRoom = room
      if (this.selectedRoom.hasOwnProperty('id') && this.selectedRoom.id) {
        this.currentRoomData = await this.getRoomData(this.selectedRoom.id)
      }
      this.saveDefaultData()
      this.isPost = false
      this.reloadData++
    },
    async getRoomData (id) {
      if (this.selectedRoom.hasOwnProperty('id') && this.selectedRoom.id) {
        const currentRoomData = await this.$app.room.getOne(id)
        return currentRoomData
      }
    },
    async getAllRooms (id) { // Получаем массив всех залов локации id
      const { items } = await this.$app.studios.getAll()
      const [{ rooms }] = items.filter(item => item.id === id)
      return rooms
    },
    async createNew () {
      const filter = this.$app.filters.getValues('settings')
      this.currentStudio = this.$app.studios.getFiltered(filter)
      const interiors = emptyRoom.clearExtras(emptyRoom.cloneObject(this.currentRoomData.interiors))
      const backgrounds = emptyRoom.clearExtras(emptyRoom.cloneObject(this.currentRoomData.backgrounds))
      const extras = emptyRoom.clearExtras(emptyRoom.cloneObject(this.currentRoomData.extras))
      const characteristics = emptyRoom.clearExtras(emptyRoom.cloneObject(this.currentRoomData.characteristics))
      const jsonData = JSON.stringify(await room.getDefaultPrices())
      const { data } = JSON.parse(jsonData)

      this.currentRoomData = {
        isRoom: 1,
        needPrepayment: 1,
        interiors,
        backgrounds,
        extras,
        characteristics,
        payment: data.payment,
        studio: {
          id: filter.studio
        },
        images: []
      }
      this.isPost = true
      this.createRoomAfterLocation = true
      // this.reloadData++
    },
    async saveChanges () {
      if (this.isPost) {
        const result = await this.$app.room.addNew(this.currentRoomData)
        if (result && result.hasOwnProperty('errors') && result.errors.length) {
          this.showNotif('Ошибка создания зала. Проверьте обязательные поля')
          result.errors.forEach(item => {
            this.highLightRequired(item.source)
          })
          return
        } else if (result.hasOwnProperty('data')) {
          this.showNotif('Зал создан!', 'green')
          this.rooms = await this.getAllRooms(this.currentRoomData.studio.id) // Обновляем список залов для блока слева
          const newRoom = this.rooms.filter(item => item.name === this.currentRoomData.name)[0]
          this.setCurrentRoom(newRoom) // Выбираем новосозданный зал в списке
        }
      } else {
        const result = await this.$app.room.updateOne({ id: this.currentRoomData.id, data: this.currentRoomData })
        if (result && result.hasOwnProperty('errors') && result.errors.length) {
          this.showNotif('Ошибка создания зала. Проверьте обязательные поля')
          result.errors.forEach(item => {
            this.highLightRequired(item.source)
          })
          return
        } else if (result.hasOwnProperty('data')) {
          this.showNotif('Данные сохранены!', 'green')
        }
        this.rooms = await this.getAllRooms(this.currentRoomData.studio.id) // Обновляем список залов для блока слева
      }
      this.saveDefaultData()
      this.reloadData++
    },
    leavePage () {
      this.isSomethingChanged = false
      this.saveDefaultData()
      this.$router.replace(this.routerTo.fullPath)
    },
    saveDefaultData () {
      this.defaultRooms = this.rooms
      let tmpObj = JSON.stringify(Object.assign({}, this.currentRoomData))
      this.roomDataDefault = JSON.parse(tmpObj)
    },
    isDefaultNotEqualCurrent (obj, defaultObj) {
      for (let key in obj) {
        if (Array.isArray(obj[key])) {
          for (let index = 0, arrLength = obj[key].length; index < arrLength; index++) {
            if (this.isDefaultNotEqualCurrent(obj[key][index], defaultObj[key][index])) {
              return true
            }
          }
        } else if (typeof obj[key] === 'object') {
          if (this.isDefaultNotEqualCurrent(obj[key], defaultObj[key])) {
            return true
          }
        } else {
          if (String(obj[key]) !== String(defaultObj[key])) {
            return true
          }
        }
      }
      return false
    },
    highLightRequired (fieldClass) {
      const field = document.querySelector(`.${fieldClass} input`)
      this.$nextTick(_ => {
        field.focus()
        field.blur()
      })
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
