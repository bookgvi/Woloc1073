<template lang="pug">
  .col-12.row.justify-around.items-center
    .col-12
      q-select.text-body2.text-weight-bold(
        outlined
        fill-input
        :disabled="!isCreate"
        :readonly="!isCreate"
        hide-selected
        @filter="filterFn"
        use-input
        input-debounce="500"
        hide-dropdown-icon
        options-dense
        placeholder="Пользователь"
        :options="$app.customers.searched.slice(0, 10)"
        :option-value="opt => opt === null ? '' : opt.fullName"
        :option-label="opt => opt === null ? '' : opt.fullName"
        v-model="customerName"
        @input.native="inputNewCustomer"
        new-value-mode="add"
        )
    .col-12
      q-input.text-body2.text-weight-bold(
        outlined
        mask="#(###)###-##-##"
        unmasked-value
        placeholder="Телефон"
        v-model="phone"
      )
    .col-12
      q-input.text-body2.text-weight-bold(
        outlined
        placeholder="Эл. почта"
        v-model="email"
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
    customerComp () {
      return this.customerChange()
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
      update()
    },
    inputNewCustomer (e) {
      if (!this.customerName.fullName) {
        this.customerName.fullName = e.data
      } else {
        this.customerName.fullName += e.data
      }
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
        this.customer = v ? Object.assign(v)
          : {
            firstName: '',
            fullName: '',
            phone: '',
            email: ''
          }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>
