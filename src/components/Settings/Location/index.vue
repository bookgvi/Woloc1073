<template lang="pug">
  .settings(:key="pageReload")
    q-tab-panels(v-model="currentTab")
      q-tab-panel.q-pa-none(name="Локация")
        location(
          :key="studioID"
          :singleStudio="singleStudio"
          :rooms="rooms"
          :isSave="isSave"
          :services="services"
          :facilities="facilities"
          @updateStudio="updateStudio"
          @newStudio="newStudio"
          @createNewStudio="createNewStudio"
        )
        q-dialog(v-model="isRequiredModal")
          q-card
            .alarmo.q-pa-lg
              .row.q-pb-sm
                .col
                  q-icon.text-red(name="warning" style="font-size: 4rem;")
                  .text-h6.text-red Заполните обязательные поля
              .row.justify-center
                .col-4
                  q-btn.bg-primary.text-white(label="Закрыть" @click="isRequiredModal = false")
</template>

<script>
import location from './main'
export default {
  name: 'setting',
  components: {
    location
  },
  data () {
    return {
      pageReload: 0,
      id: this.$app.filters.getValues('settings').studio,
      isRequiredModal: false,
      currentTab: 'Локация',
      tabs: ['Локация'],
      singleStudio: {},
      currentStudio: '',
      isSave: false,
      rooms: [],
      services: [],
      facilities: []
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
      let filter = await this.$app.filters.getValues('settings')
      if (!filter.studio) return
      if (!this.singleStudio) return
      this.rooms = this.$app.rooms.getFiltered(filter)
      if (!this.rooms) return
      this.singleStudio = await this.$app.studios.getOne(filter.studio)
      this.services = this.singleStudio.services
      this.facilities = this.singleStudio.facilities
    },
    async updateStudio (services, vendors) {
      let { studio } = this.$app.filters.getValues('settings')
      if (!studio) {
        studio = this.currentStudio
      }
      if (
        !this.singleStudio.name ||
        !this.singleStudio.phone ||
        !this.singleStudio ||
        !this.singleStudio.limit ||
        !this.singleStudio.height ||
        !this.singleStudio.yardage ||
        !this.singleStudio.address
      ) {
        this.isRequiredModal = true
        return
      }
      await this.$app.studios.updateOne({ id: studio, data: this.singleStudio })
    },
    async newStudio () {
      this.isSave = true
      this.singleStudio = { lat: 55.786419, lon: 37.725433 }
      this.rooms = []
      this.services = []
      this.facilities = []
    },
    async createNewStudio () {
      if (
        !this.singleStudio.name ||
        !this.singleStudio.phone ||
        !this.singleStudio ||
        !this.singleStudio.limit ||
        !this.singleStudio.height ||
        !this.singleStudio.yardage ||
        !this.singleStudio.address
      ) {
        this.isRequiredModal = true
        return
      }
      const result = await this.$app.studios.addNew(this.singleStudio)
      if (result) {
        this.isSave = false
      }
      this.pageReload++
    }
  }
}
</script>
