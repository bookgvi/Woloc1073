<template lang="pug">
  .settings(:key="pageReload")
    q-tab-panels(v-model="currentTab")
      q-tab-panel.q-pa-none(name="Локация")
        location(
          :key="studioID"
          :singleStudio="singleStudio"
          :rooms="rooms"
          :isSave="isSave"
          @updateStudio="updateStudio"
          @newStudio="newStudio"
          @createNewStudio="createNewStudio"
          @reloadPage="pageReload++"
        )
</template>

<script>
import location from './main'
import { Util } from '../Helper/utils'
const emptyLocation = new Util()
export default {
  name: 'setting',
  components: {
    location
  },
  data () {
    return {
      emptyLocation: 'emptyLocation',
      pageReload: 0,
      id: this.$app.filters.getValues('settings').studio,
      currentTab: 'Локация',
      tabs: ['Локация'],
      singleStudio: {},
      currentStudio: '',
      isSave: false,
      rooms: [],
      requiredFields: ['name', 'phone', 'limit', 'email', 'height', 'yardage', 'address']
    }
  },
  computed: {
    studioID () {
      this.singleStudioM()
      return this.$app.filters.getValues('settings').studio
    }
  },
  mounted () {
    this.singleStudioM()
  },
  methods: {
    async singleStudioM () {
      this.isSave = false // ----------------------------- Сбрасываем поле для метода POST
      let filter = await this.$app.filters.getValues('settings')
      if (!filter.studio) return
      if (!this.singleStudio) return
      this.rooms = this.$app.rooms.getFiltered(filter)
      if (!this.rooms) return
      this.singleStudio = await this.$app.studios.getOne(filter.studio)
    },
    /*
    *
    * Обработка кнопки Сохранить
    */
    async updateStudio (services, vendors) {
      if (
        !this.singleStudio.name ||
        !this.singleStudio.phone ||
        !this.singleStudio.email ||
        !this.singleStudio ||
        !this.singleStudio.limit ||
        !this.singleStudio.height ||
        !this.singleStudio.yardage ||
        !this.singleStudio.address
      ) {
        console.warn('Заполните обязательные поля')
        this.showNotif('Заполните обязательные поля')
        this.requiredFields.forEach(item => {
          this.highLightRequired(item)
        })
        return
      }
      let { studio } = this.$app.filters.getValues('settings')
      if (!studio) {
        studio = this.currentStudio
      }
      let result = ''
      let newStudioId = ''
      /*
      *
      *
      * Метод POST
      * */
      if (this.isSave) {
        result = await this.$app.studios.addNew(this.singleStudio)
        if (result && result.hasOwnProperty('data')) {
          newStudioId = result.data.id
        }
      /*
      *
      *
      * Метод PUT
      * */
      } else {
        let { studio } = this.$app.filters.getValues('settings')
        if (!studio) {
          studio = this.currentStudio
        }
        result = await this.$app.studios.updateOne({ id: studio, data: this.singleStudio })
        if (result && result.hasOwnProperty('id')) {
          newStudioId = ''
        }
      }
      /*
      *
      *
      * Обработка результатов POST/PUT
      * */
      if (result && result.hasOwnProperty('errors') && result.errors.length) {
        this.showNotif('Ошибка создания локации. Проверьте обязательные поля')
        result.errors.forEach(item => {
          this.highLightRequired(item.source)
        })
      } else if (result.hasOwnProperty('data')) {
        this.showNotif('Данные сохранены!', 'green')
        /*
        *
        *
        * Если использовался POST, то в фильтре выбираем новосозданную локацию
        * */
        if (newStudioId) {
          this.$app.filters.setValue('settings', 'studio', newStudioId)
          this.singleStudioM()
          this.pageReload++
        }
      }
    },
    async newStudio () {
      this.isSave = true
      this.rooms = []
      const services = emptyLocation.clearExtras(emptyLocation.cloneObject(this.singleStudio.services))
      const facilities = emptyLocation.clearExtras(emptyLocation.cloneObject(this.singleStudio.facilities))
      this.singleStudio = {
        lat: 55.786419,
        lon: 37.725433,
        services,
        facilities,
        images: []
      }
    },
    /*
    *
    *
    * Обработка кнопки Сохранить и создать зал
    * */
    async createNewStudio () {
      if (
        !this.singleStudio.name ||
        !this.singleStudio.phone ||
        !this.singleStudio.email ||
        !this.singleStudio ||
        !this.singleStudio.limit ||
        !this.singleStudio.height ||
        !this.singleStudio.yardage ||
        !this.singleStudio.address
      ) {
        console.warn('Заполните обязательные поля')
        this.showNotif('Заполните обязательные поля')
        this.requiredFields.forEach(item => {
          this.highLightRequired(item)
        })
        return
      }
      let result = ''
      /*
      *
      *
      * Метод POST
      * */
      if (this.isSave) {
        result = await this.$app.studios.addNew(this.singleStudio)
      /*
      *
      *
      * Метод PUT
      * */
      } else {
        let { studio } = this.$app.filters.getValues('settings')
        if (!studio) {
          studio = this.currentStudio
        }
        result = await this.$app.studios.updateOne({ id: studio, data: this.singleStudio })
      }
      /*
      *
      *
      * Обработка результатов POST/PUT
      * */
      if (result) {
        if (result && result.hasOwnProperty('errors') && result.errors.length) {
          this.showNotif('Ошибка создания локации. Проверьте обязательные поля')
          result.errors.forEach(item => {
            this.singleStudio[item.source] = ''
            this.highLightRequired(item.source)
          })
        } else if (result.hasOwnProperty('data')) {
          this.showNotif('Данные сохранены!', 'green')
          this.isSave = false
          await this.$app.filters.setValue('settings', 'studio', result.data.id)
          this.$router.push({ path: '/settings/room', query: { createRoom: true } })
        }
      }
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
