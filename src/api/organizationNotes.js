import api from './instance'

import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const organizationNotes = new AbstractAPI(`${API_URL}/dashboard/organization-notes`)
organizationNotes.getAll = async function () {
  try {
    const r = await api.get(`${API_URL}/dashboard/organization-notes`)
    return r.data
  } catch (e) {
    console.warn('catch :: dashboard/organization-notes :: getAll', e)
  }
}
