import api from './instance'
import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const refunds = new AbstractAPI(`${API_URL}/refunds`)
refunds.confirm = async function (id) {
  try {
    const r = await api.post(`${API_URL}/refunds/confirm/${id}`)
    return r
  } catch (e) {
    console.warn('catch :: refunds :: confirm', e)
    return e
  }
}
refunds.cancel = async function (id) {
  try {
    const r = await api.post(`${API_URL}/refunds/cancel/${id}`)
    return r
  } catch (e) {
    console.warn('catch :: refunds :: cancel', e)
    return e
  }
}
