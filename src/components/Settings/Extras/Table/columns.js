import { date } from 'quasar'

export default [
  {
    name: 'title',
    label: 'Название',
    active: true,
  },
  {
    name: 'rooms',
    label: 'Зал',
    active: true,
    headerStyle: 'text-align: center;',
  },
  {
    name: 'amount',
    label: 'цена, ₽.',
    active: true,
  },
  {
    name: 'maxLimit',
    label: 'лимит',
    active: true,
  },
  {
    name: 'createdAt',
    label: 'Дата создания',
    format: value => date.formatDate(value, 'D MMMM YYYY в h:mm'),
    active: true,
  },
  {
    name: 'extrasControls',
    active: true,
    align: 'right'
  }
]
