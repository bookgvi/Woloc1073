export const defaultValues = {
  customers: {
    search: null
  },
  bookings: {
    studio: null,
    rooms: null,
    customer: null,
    statuses: [0, 1, 2, 3, 4],
    technical: false,
    search: null
  },
  finances: {
    'date[startedAt]': null,
    'date[finishedAt]': null,
    'time[hourFrom]': 0,
    'time[hourTo]': 23,
    purposes: [1, 2, 3, 4, 5, 6, 7, 9],
    search: null
  },
  refunds: {
    studio: null,
    rooms: null,
    statuses: [0, 1, 2, 3],
    search: null,
    'date[startedAt]': null,
    'date[finishedAt]': null,
    'time[hourFrom]': 0,
    'time[hourTo]': 23
  },
  documents: {
    search: null,
    'date[startedAt]': null,
    'date[finishedAt]': null,
    'time[hourFrom]': 0,
    'time[hourTo]': 23
  },
  settings: {
    studio: null
  },
  calendar: {
    studio: null,
    rooms: null,
    events: ['photo', 'video', 'event'],
    dateRangeFrom: '',
    dateRangeTo: '',
    price: {
      min: -1,
      max: -1
    }
  }
}
