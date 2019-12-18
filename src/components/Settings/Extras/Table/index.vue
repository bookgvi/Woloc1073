<template lang="pug">
  .table.wrapper.wrapper--header
    DataTable(
      title="Дополнительные услуги"
      :key="reloadPage"
      :loadData="$app.extras.getAll"
      :filter="$app.filters.getValues('settings')"
      :columns="columns"
      @toggleDialogRow="toggleDialogRow"
    )
      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить услугу" no-caps @click="createExtra")

      // template(#row-controls="props")
        q-btn(flat round icon="drag_handle" no-caps title="Редактировать")
    q-dialog(v-model="editExtras")
      q-card(style="min-width: 700px")
        q-card-section
          editExtras(
            :allRoomsOfThisStudio="allRoomsOfThisStudio"
            :singleStudio="singleStudio"
            :rooms="rooms"
            :dataset="dataset"
            @hide="closeModal"
            @hasPostOrPut="hasPostOrPut"
            :isPost="isPost"
          )
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import editExtras from '../editExtrasModal/editExtras'
import { extras } from '../../../../api/extras'
export default {
  name: 'extrasTable',
  components: { DataTable, editExtras },
  data: () => ({
    columns,
    details,
    editExtras: false,
    dataset: {},
    singleStudio: {},
    rooms: [],
    allRoomsOfThisStudio: [],
    isPost: false,
    reloadPage: 0
  }),
  methods: {
    async toggleDialogRow (props) {
      const items = this.$app.studios.getFiltered(this.$app.filters.readFromSession().settings)
      const { rooms } = props
      this.allRoomsOfThisStudio = items.rooms
      this.rooms = this.isPost ? items.rooms.filter((item, index) => !index) : rooms
      this.singleStudio = items
      this.editExtras = true
      this.dataset = props
    },
    async createExtra () {
      this.isPost = true
      const mock = Object.assign({}, await extras.getMock())
      this.isPost = true
      this.toggleDialogRow(mock)
    },
    hasPostOrPut () {
      this.isPost = false
      this.editExtras = false
      this.reloadPage++
    },
    closeModal () {
      this.editExtras = false
      this.isPost = false
    }
  }
}
</script>
