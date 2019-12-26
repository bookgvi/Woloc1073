<template lang="pug">
  .images
    h6.q-mb-md Изображения
    .row.q-pb-sm
      .col
        q-btn.q-btn--no-uppercase(label="Выбрать файл" outline dense)
    .row.no-wrap.q-pb-lg(v-if="!isShow")
      draggable(v-model="singleStudio.images")
        .inline-block(v-for="index in defaultImgCount" :key="index" title="Drag and drop")
          q-img.q-mr-sm.q-mb-sm.cursor-pointer(:src="singleStudio.images[index - 1].src" style="height: 140px; width: 140px")
            template(v-slot:error)
              div.absolute-full.flex.flex-center.bg-grey.text-white ошибка загрузки изображения
            q-btn.absolute-top-right(icon="close" class="block" dense flat color="white" title="close")
    .row.no-wrap.q-pb-lg(v-if="isShow")
      draggable(v-model="singleStudio.images")
        .inline-block(v-for="(item, index) in singleStudio.images" :key="index" title="Drag and drop")
          q-img.q-mr-sm.q-mb-sm.cursor-pointer(:src="item.src" style="height: 140px; width: 140px")
            template(v-slot:error)
              div.absolute-full.flex.flex-center.bg-grey.text-white ошибка загрузки изображения
            q-btn.absolute-top-right(icon="close" class="block" dense flat color="white" title="close")
    .row
      .col
        .cursor-pointer(v-if="!isShow" @click="isShow = !isShow" style="font-size: 18px")
          q-icon(name="keyboard_arrow_down")
          span.text-primary &nbsp; Показать ещё {{ singleStudio.images.length - defaultImgCount }} изображений
        .cursor-pointer(v-if="isShow" @click="isShow = !isShow" style="font-size: 18px")
          q-icon(name="keyboard_arrow_up")
          span.text-primary &nbsp; Скрыть изображения
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'images',
  components: { draggable },
  props: {
    singleStudio: Object
  },
  data: () => ({
    isShow: false,
    defaultImgCount: 4
  })
}
</script>

<style scoped>
  .closeBtn {
    position: relative;
  }
</style>
