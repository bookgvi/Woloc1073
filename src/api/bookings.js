import api from './instance'
import { AbstractAPI } from './AbstractAPI'

const API_URL = process.env.API_CABINET_URL
export const bookings = new AbstractAPI(`${API_URL}/bookings`)
bookings.addNewTechnical = async function (payload) {
  try {
    const r = await api.post(`${API_URL}/bookings/technical`, payload)
    return r.data
  } catch (e) {
    console.warn('catch :: bookings :: addNewtechnical', e)
  }
}

bookings.getForCalendar = async function (filter) {
  try {
    const r = await api.get(`${API_URL}/calendar`, {
      params: {
        dateFrom: filter.dateFrom,
        dateTo: filter.dateTo,
        studio: filter.studio,
        rooms: filter.rooms
      }
    })
    return r.data
  } catch (e) {
    console.warn('catch :: bookings :: getForCalendar', e)
  }
}

bookings.dashboardBookingsShare = async function (payload) {
  const { dateFrom, dateTo } = payload
  try {
    const r = await api.get(`${API_URL}/dashboard/bookings-share`, {
      params: {
        dateFrom,
        dateTo
      }
    })
    return r.data
  } catch (e) {
    console.warn('catch :: bookings :: dashboard/bookings-share', e)
  }
}

bookings.dashboardBookingsProfit = async function (payload) {
  const { dateFrom, dateTo, interval } = payload
  try {
    const r = await api.get(`${API_URL}/dashboard/profit`, {
      params: {
        dateFrom,
        dateTo,
        interval
      }
    })
    return r.data
  } catch (e) {
    console.warn('catch :: bookings :: dashboard/profit', e)
  }
}
