import api from './instance'
import extrasMock from 'src/mocks/extras'
import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const extras = new AbstractAPI(`${API_URL}/settings/extras`)
extras.getMock = async function () {
  try {
    const r = {
      data: extrasMock
    }
    return r.data
  } catch (e) {
    console.warn('catch :: extras :: getMock', e)
    return e
  }
}
extras.getForCalendar = async function (payload) {
  try {
    const r = await api.get(`${API_URL}/rooms/${payload.room}/extras`)
    return r.data
  } catch (e) {
    console.warn('catch :: extras :: getForCalendar', e)
  }
}
