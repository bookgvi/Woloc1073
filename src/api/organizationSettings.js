import api from './instance'

import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const organizationSettings = new AbstractAPI(`${API_URL}/dashboard/organization`)
organizationSettings.getAll = async function () {
  try {
    const r = await api.get(`${API_URL}/dashboard/organization`)
    return r.data
  } catch (e) {
    console.warn('catch :: dashboard/organization-settings :: getAll', e)
  }
}
