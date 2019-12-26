<template lang="pug">
  .google
    .row.q-pb-lg
      .col
        .row.q-pb-xs
          span Google календарь
        .row
          q-btn.bg-primary.text-white(v-if="roomData.googleCalendarIsAttached" label="Отвязать google календарь" no-caps flat)
          q-btn.bg-primary.text-white(v-else label="Привязать google календарь" no-caps flat)
</template>

<script>
export default {
  name: 'Google',
  props: {
    roomData: Object
  }
}
</script>
