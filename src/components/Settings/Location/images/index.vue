<template lang="pug">
  .images
    h6.q-mb-md Изображения
    .row.q-pb-sm
      .col
        q-btn.q-btn--no-uppercase(label="Выбрать файл" @click="showUploadFileDialog" outline dense)
        q-btn.q-pl-xs(@click="$emit('reloadPage')" dense flat)
          q-icon(name="cached" style="font-size: 1.5em;")
    .hasServerData(v-if="isServerResponse")
      .row.no-wrap.q-pb-lg(v-if="!isShow")
        draggable(v-model="singleStudioVM.images" @change="changeSortField(singleStudioVM.images)")
          .inline-block(v-for="index in Math.min(defaultImgCount, singleStudioVM.images.length)" :key="index" title="Drag and drop")
            q-img.q-mr-sm.q-mb-sm.cursor-pointer(
              v-if="!singleStudioVM.images[index - 1].isDeleted"
              :src="srcVM(singleStudioVM.images[index - 1].src)"
              style="height: 140px; width: 140px"
            )
              q-btn.absolute-top-right(icon="close" class="block" dense flat color="white" title="close" @click="deleteImg(singleStudioVM.images[index - 1], index- 1)")
              template(v-slot:error)
                .absolute-full.flex.flex-center.bg-grey-6.text-white Не удалось загрузить изображение
      .row.no-wrap.q-pb-lg(v-if="isShow")
        draggable(v-model="singleStudioVM.images" @change="changeSortField(singleStudioVM.images)")
          .inline-block(v-for="(item, index) in singleStudioVM.images" :key="index" title="Drag and drop")
            q-img.q-mr-sm.q-mb-sm.cursor-pointer(
              v-if="!item.isDeleted"
              :src="srcVM(item.src)"
              style="height: 140px; width: 140px"
            )
              q-btn.absolute-top-right(icon="close" class="block" dense flat color="red" title="close" @click="deleteImg(item, index)")
              template(v-slot:error)
                .absolute-full.flex.flex-center.bg-grey-6.text-white Не удалось загрузить изображение
      .row
        .col
          .cursor-pointer(v-if="!isShow && singleStudioVM.images.length > defaultImgCount" @click="isShow = !isShow" style="font-size: 18px")
            q-icon(name="keyboard_arrow_down")
            span.text-primary &nbsp; Показать еще {{ singleStudioVM.images.length - defaultImgCount }} изображений
          .cursor-pointer(v-if="isShow" @click="isShow = !isShow" style="font-size: 18px")
            q-icon(name="keyboard_arrow_up")
            span.text-primary &nbsp; Скрыть изображения
    q-dialog(v-model="isModalForUploadFile")
      q-card
        uploadForm(@closeUploadDialog="closeUploadDialog" @closeUploadDialogWithoutReload="closeUploadDialogWithoutReload" :singleStudio="singleStudio")
</template>

<script>
import draggable from 'vuedraggable'
import uploadForm from './uploadForm'
export default {
  name: 'images',
  components: { draggable, uploadForm },
  props: {
    singleStudio: {
      type: Object
    }
  },
  data: () => ({
    defaultImgCount: 4,
    isShow: false,
    isModalForUploadFile: false,
    isServerResponse: false,
  }),
  watch: {
    singleStudioVM (oldVal, newVal) {
      if (newVal) {
        this.isServerResponse = true
        this.imgSortMethod()
      }
    }
  },
  computed: {
    singleStudioVM: {
      get () {
        return this.singleStudio
      }
    }
  },
  methods: {
    srcVM (val) {
      return `${val}`
    },
    imgSortMethod () {
      this.singleStudioVM.images.sort((current, prev) => {
        if (current.sort === prev.sort) return 0
        return current.sort > prev.sort ? 1 : -1
      })
    },
    async changeSortField (imgArray) {
      imgArray.forEach((item, index) => {
        item.sort = index
      })
      const result = await this.$app.studios.updateOne({ id: this.singleStudioVM.id, data: this.singleStudioVM })
      if (result.hasOwnProperty('data')) {
        this.showNotif('Изменения сохранены', 'green')
      } else {
        this.showNotif('Ошибка сохранения изменений', 'red')
      }
    },
    closeUploadDialog () {
      this.isModalForUploadFile = false
      this.$emit('reloadPage')
    },
    closeUploadDialogWithoutReload () {
      this.isModalForUploadFile = false
    },
    async deleteImg (img, index) {
      img.isDeleted = true
      const result = await this.$app.studios.updateOne({ id: this.singleStudioVM.id, data: this.singleStudioVM })
      if (result.hasOwnProperty('data')) {
        this.showNotif('Изображение удалено', 'orange')
      } else {
        this.showNotif('Ошибка загрузки изображения', 'red')
      }
    },
    showUploadFileDialog () {
      if (!this.singleStudio.id) {
        this.showNotif('Сначала создайте и сохраните локацию', 'orange')
        return
      }
      this.isModalForUploadFile = true
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
  .closeBtn {
    position: relative;
  }
</style>
