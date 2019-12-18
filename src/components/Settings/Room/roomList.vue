<template lang="pug">
  .roomList
    .row.cursor-pointer(
      v-for="(room, index) in rooms"
      :key="index"
      style="width: 200px;"
      @click="$emit('setCurrentRoom', rooms[index])"
      :class="room.id === selectedRoom ? { 'bg-grey-3': backGround } : { 'bg-white': backGround }"
    )
      .col.align-right
        p.q-ml-sm.q-mt-md(
          style="width: 100%"
        ) Зал {{ room.name }}
</template>

<script>
export default {
  name: 'roomList',
  props: {
    rooms: {
      type: Array,
      default: () => []
    },
    selectedRoom: {
      validator: value => {
        return ['null', 'number'].indexOf(typeof value) !== -1
      },
      default: _ => null
    }
  },
  data () {
    return {
      backGround: true
    }
  }
}
</script>

<style scoped>
  .col:hover {
    background-color: #eeeeee;
  }
</style>
