<template lang="pug">
  .col
    .row.q-pb-sm
      .col
        span Пользователь &nbsp
        span.text-red *
    .row
      .col
        q-select.text-body2.text-weight-bold(
          outlined
          fill-input
          :disabled="!isCreate"
          :readonly="!isCreate"
          hide-selected
          @filter="filterFn"
          use-input
          input-debounce="0"
          hide-dropdown-icon
          options-dense
          placeholder="Пользователь"
          :options="$app.customers.searched.slice(0, 10)"
          :option-value="opt => opt === null ? '' : opt.fullName"
          :option-label="opt => opt === null ? '' : opt.fullName"
          v-model="customerName"
          new-value-mode="add"
          :rules="[val => !!val.fullName || 'Обязательно для заполнения']"
          lazy-rules
        )
    .row.q-pb-sm
      .col
        span Телефон
    .row.q-pb-md
      .col
        q-input.text-body2.text-weight-bold(
          outlined
          mask="#(###)###-##-##"
          unmasked-value
          placeholder="Телефон"
          v-model="phone"
        )
    .row.q-pb-sm
      .col
        span Эл. почта &nbsp
        span.text-red *
    .row
      .col
        q-input.text-body2.text-weight-bold(
          outlined
          placeholder="Эл. почта"
          v-model="email"
          :rules="[val => !!val || 'Обязательно для заполнения']"
          lazy-rules
        ) {{ customerComp }}
</template>

<script>
export default {
  name: 'CalendarCustomer',
  data () {
    return {
      customer: {
        id: '',
        firstName: '',
        fullName: '',
        phone: '',
        email: ''
      }
    }
  },
  computed: {
    customerComp () {
      return this.customerChange()
    },
    customerName: {
      get () {
        return this.customer
      },
      set (val) {
        if (typeof val === 'object') {
          this.customer = val
        } else {
          this.startCustomer.customer = {
            fullName: val
          }
        }
      }
    },
    phone: {
      get () {
        return this.customer.phone ? this.customer.phone : ''
      },
      set (v) {
        this.customer.phone = v
      }
    },
    email: {
      get () {
        return this.customer.email ? this.customer.email : ''
      },
      set (v) {
        this.customer.email = v
      }
    }
  },
  methods: {
    customerChange () {
      this.$emit('customerChange', this.customer)
    },
    async filterFn (val, update, abort) {
      if (!val || val.length < 1) {
        abort()
        return
      }
      await this.$app.customers.getForCalendar(val.toLowerCase())
      update(_ => {
        this.customer.fullName = val
      })
    }
  },
  props: {
    startCustomer: Object,
    isCreate: {
      type: Boolean
    }
  },
  watch: {
    'startCustomer.customer': {
      handler (v) {
        if (v && v.hasOwnProperty('id') && v.id) {
          this.customer = Object.assign(v)
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
