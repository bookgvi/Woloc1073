<template lang="pug">
  .q-px-md.justify-end
    q-list.cursor-pointer.text-primary(v-if="isAuthorized")
      q-item.col-12
        q-item-section.col-9
          span {{ userName }}
        q-item-section.col-3
          q-avatar
            img(:src="avatar")
        q-popup-proxy
          q-card.q-pa-md(style="min-width: 180px;")
            q-separator.q-mb-sm
            span.cursor-pointer(@click="exit") Выйти
</template>

<script>
import { LocalStorage, SessionStorage } from 'quasar'
export default {
  name: 'User',
  data () {
    return {
      isAuthorized: false,
      userName: 'user',
      avatar: 'https://cdn.quasar.dev/img/avatar.png'
    }
  },
  watch: {
    '$route.path' (newPath, oldPath) {
      if (newPath) {
        this.setUserData()
      } else if (newPath === '/login') {
        this.isAuthorized = false
      }
    }
  },
  mounted () {
    this.setUserData()
  },
  methods: {
    setUserData () {
      if (!LocalStorage.getItem('user-name')) return
      this.userName = LocalStorage.getItem('user-name')
      this.avatar = LocalStorage.getItem('user-avatar')
      if (window.location.hostname === 'localhost') {
        this.avatar = 'https://pre.ugoloc.ucann.ru' + this.avatar
      }
      this.isAuthorized = true
    },
    exit () {
      LocalStorage.clear()
      SessionStorage.clear()
      this.$router.go()
    }
  }
}
</script>

<style scoped lang="stylus">
/*  .round
    border 0 solid
    border-radius 30px
  .user
    width 150px
    padding-right 20px
  .img
    width 30px
    height 30px
    object-fit cover
    color black
  .username
    margin auto
    margin-right 20px
    color #9b9b9b
    font-size 14px
    font-family Montserrat
    font-weight 500
    letter-spacing -0.3px
    line-height 18px
    text-align right
 */
</style>
