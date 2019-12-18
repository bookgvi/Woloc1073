import api from './instance'
import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const finances = new AbstractAPI(`${API_URL}/finances`)
finances.withdraw = async function () {
  try {
    await api.post(`${API_URL}/finances/withdrawal`)
  } catch (e) {
    console.warn('catch :: finances :: withdraw', e.message)
  }
}
finances.dashboardFinances = async function (payload) {
  const { date } = payload
  try {
    const r = await api.get(`${API_URL}/dashboard/finances`, {
      params: {
        date
      }
    })
    return r.data
  } catch (e) {
    console.warn('catch :: finances :: dashboard/finances', e)
  }
}
