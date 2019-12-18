import { date } from 'quasar'

export default [
  {
    name: 'title',
    label: 'Название',
    active: true,
    width: 150
  },
  {
    name: 'rooms',
    label: 'Зал',
    active: true,
    width: 120
  },
  {
    name: 'amount',
    label: 'цена, ₽.',
    active: true,
    width: 120
  },
  {
    name: 'maxLimit',
    label: 'лимит',
    active: true,
    width: 120
  },
  {
    name: 'createdAt',
    label: 'Дата создания',
    format: value => date.formatDate(value, 'D MMMM YYYY в h:mm'),
    active: true,
    width: 60
  },
  {
    name: 'extrasControls',
    width: 40,
    active: true,
    align: 'right'
  }
]
