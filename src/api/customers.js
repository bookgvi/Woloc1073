import api from './instance'
import { AbstractAPI } from './AbstractAPI'

const API_URL = process.env.API_CABINET_URL
export const customers = new AbstractAPI(`${API_URL}/customers`)

customers.getSearchedCustomers = async function (search) {
  try {
    const r = await api.get(`${API_URL}/customers`, {
      params: { search }
    })

    return r.data
  } catch (e) {
    console.warn('catch :: customers :: getSearchedCustomers', e)
  }
}
