<template lang="pug">
  .editExtras
    .row.justify-center
      .col
        .text-h6 Дополнительная услуга
      q-space
      .col-1
        q-btn(icon="close" flat @click="$emit('hide')")
    .row
      span Название&nbsp;
        span.text-red *
    .row.q-pb-md
      .col
        q-input(
          v-model="dataset.title"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          outlined
          autofocus
        )
    .row
      .col.q-pr-md
        span Локация&nbsp;
        span.text-red *
      .col
        span Зал&nbsp;
        span.text-red *
    .row.q-pb-md
      .col.q-pr-md
        q-input(
          v-model="singleStudio.name"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          outlined
          disable
        )
      .col
        q-select(
          v-model="selectedRooms"
          :options="allRoomsOfThisStudio.map(item => item.name)"
          :rules="[val => val.length || 'Обязательно для заполнения']"
          multiple
          outlined
          autofocus
        )
    .row
      span Описание
    .row.q-pb-md
      .col
        textarea.text-grey-8(v-model="dataset.description" type="textarea" rows="4" style="width: 100%;")
    .row
      span Цена, ₽
    .row.q-pb-md
      q-input(v-model.number="dataset.amount" outlined)
    .row
      q-checkbox(v-model="hasLimit" label="Включить ограничение по колличеству доп. услуг")
    .col(v-if="hasLimit")
      .row
        span Лимит
      .row
        q-input(v-model="dataset.maxLimit" outlined)
    .row.q-py-md
      .text-h6 Изображения
    //.row.q-pb-xs
      q-btn(outline dense label="Выбрать файл")
    .row.no-wrap.q-pb-md
      q-img(:src="dataset.image | imgUrl" style="height: 150px; max-width: 150px")
        q-btn.absolute-top-right(icon="close" class="block" dense flat color="white")
    .row.q-pb-md.justify-center
      .col-6.q-pa-sm
        q-btn.fit.bg-white.text-black(label="Удалить" no-caps outline size="1.3em" color="grey-8" @click="deleteOne")
      .col-6.q-pa-sm
        q-btn.fit.bg-primary.text-white(label="Сохранить" no-caps flat size="1.3em" @click="saveChanges")
</template>

<script>
import FiltersList from '../../../Filters/FiltersList'
import RoomsFilter from '../../../Filters/RoomsFilter'
import { extras } from '../../../../api/extras'
export default {
  name: 'modalForExtras',
  props: {
    singleStudio: Object,
    rooms: Array,
    dataset: Object,
    allRoomsOfThisStudio: Array,
    isPost: Boolean
  },
  components: {
    FiltersList,
    RoomsFilter
  },
  data: () => ({
    isLimit: false,
    selected: []
  }),
  filters: {
    imgUrl () {
      return 'http://placeimg.com/640/480/animals'
    }
  },
  computed: {
    hasLimit: {
      get () {
        return this.isLimit
      },
      set (val) {
        this.isLimit = val
        if (!val) {
          this.dataset.maxLimit = 0
        }
      }
    },
    selectedRooms: {
      get () {
        return this.selected
      },
      set (val) {
        this.selected = val
        this.dataset.rooms = val
        this.dataset.rooms = this.selected.map(item => {
          const arrayWithOneRoom = this.allRoomsOfThisStudio.filter(item2 => item === item2.name)
          return arrayWithOneRoom.pop()
        })
      }
    }
  },
  mounted () {
    this.hasLimit = Boolean(this.dataset.maxLimit)
    this.selected = this.rooms.map(item => item.name)
    this.dataset.rooms = this.rooms
  },
  methods: {
    async saveChanges () {
      if (this.dataset.studio.hasOwnProperty('id')) {
        this.dataset.studio = this.dataset.studio.id
      }
      if (this.isPost) {
        this.dataset.studio = this.singleStudio.id
        const result = await this.$app.extras.addNew(this.dataset)
        if (!result.hasOwnProperty('data')) {
          result.errors.forEach(item => {
            if (item.source !== 'rooms') this.dataset[item.source] = ''
          })
          this.showNotif('Ошибка')
        } else {
          this.showNotif('Услуга добавлена', 'green')
          this.$emit('hasPostOrPut')
        }
      } else {
        this.publishedAt = new Date()
        this.dataset.amount = Number(this.dataset.amount)
        const result = await this.$app.extras.updateOne({ id: this.dataset.id, data: this.dataset })
        if (!result.hasOwnProperty('data')) {
          this.showNotif('Ошибка при сохранении изменений')
        } else {
          this.showNotif('Изменения сохранены', 'green')
          this.$emit('hasPostOrPut')
        }
      }
    },
    async deleteOne () {
      const result = await extras.deleteOne(this.dataset.id)
      if (!result.hasOwnProperty('data')) {
        this.showNotif('Ошибка удаления услуги')
      } else {
        this.showNotif('Услуга удалена', 'orange')
        this.$emit('hasPostOrPut')
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
