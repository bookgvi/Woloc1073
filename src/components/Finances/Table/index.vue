<template lang="pug">
  .pageFinance
    DataTable(
      title="Финансы"
      :loadData="$app.finances.getAll"
      :filter="$app.filters.getValues('finances')"
      :getDialogTitle="() => 'Финансы'"
      :columns="columns"
      :details="details"
    )
      template(#title-append="props")
        .text-h6.inline-block.q-pl-md {{ props.amount }} ₽
      template(#table-controls-prepend="props")
        q-btn.bg-primary.q-mr-md(no-caps text-color='white' flat label="Вывести на счет" @click="isWithdraw=true")
        // TODO - доп действия со счетом могут понадобится позже!
        // q-btn.bg-primary.text-white.q-mr-md.q-pa-none(flat)
          q-icon(name="expand_more")
          q-popup-proxy.q-mt-md(auto-close :offset="[154, 3]")
            q-card(style="width: 180px;")
              .row
                .col
                  q-btn.q-py-none.q-px-sm(
                    no-caps
                    flat
                    label="Отметить предоплату"
                    @click="isPrepayment = true"
                    style="width: 100%;"
                  )
              .row
                .col
                  q-btn.q-py-none.q-px-sm(
                    no-caps
                    label="Сделать возврат"
                    @click="isRefund = true"
                    style="width: 100%;"
                  )
    q-dialog(v-model="isWithdraw" persistent)
      q-card(style="position: absolute; top: 10rem; min-width: 500px;")
        withdraw-modal(@hasWithdraw="hasWithdraw")
    q-dialog(v-model="isPrepayment")
      q-card(style="min-width: 640px;")
        prepayment
    q-dialog(v-model="isRefund")
      q-card(style="min-width: 640px;")
        refund
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import refund from '../Actions/refundModal'
import prepayment from '../Actions/prepaymentModal'
import WithdrawModal from '../WithdrawModal'
export default {
  name: 'FinancesTable',
  components: {
    DataTable,
    refund,
    prepayment,
    WithdrawModal
  },
  data: () => ({
    columns,
    details,
    isWithdraw: false,
    withdrawValue: 0,
    isRefund: false,
    isPrepayment: false
  }),
  methods: {
    hasWithdraw () {
      this.isWithdraw = false
    }
  }
}
</script>

<style scoped>
</style>
