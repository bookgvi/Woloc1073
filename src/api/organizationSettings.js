import api from './instance'

import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const organization = new AbstractAPI(`${API_URL}/settings/organizations`)
organization.getOne = async function () {
  try {
    const r = await api.get(`${API_URL}/settings/organizations`)
    return r
  } catch (e) {
    console.warn('catch :: getOne', e)
  }
}
