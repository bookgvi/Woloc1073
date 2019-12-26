<template lang="pug">
  .datas
    h6.q-mb-md Данные локации
    .row.q-pb-lg
      .col
        span Название &nbsp
        span.text-red *
        q-input.q-pt-sm(
          class="name"
          v-model="singleStudio.name"
          placeholder="Название студии"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          outlined
          dense
        )
    .row.q-pb-lg
      .col.q-pr-sm
        span Телефон &nbsp
        span.text-red *
        q-input.q-pt-sm(
          class="phone"
          v-model="singleStudio.phone"
          placeholder="+7 (800) 800 0123"
          mask="+# (###) ### ####"
          unmasked-value
          type="tel"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          outlined
          dense
        )
      .col
        span Эл. почта &nbsp
        span.text-red *
        q-input.q-pt-sm(
          class="email"
          v-model="singleStudio.email"
          placeholder="email@doamin.com"
          type="email"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
          outlined
          dense
        )
    .row.q-pb-sm
      q-checkbox(v-model="singleStudio.hidden" label="Скрыть локацию" dense)
    .row
      p В этом случае локация не будет публиковаться в общих списках, не будет выдаваться в каталоге, но будет доступна по прямой ссылке.
</template>

<script>
export default {
  name: 'datas',
  props: {
    singleStudio: Object
  }
}
</script>
