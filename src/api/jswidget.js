import api from './instance'
import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const jswidget = new AbstractAPI(`${API_URL}/settings/jswidget`)
jswidget.getOne = async function ({ id }) {
  try {
    const data = await api.get(`${API_URL}/settings/jswidget/${id}`)
    return data
  } catch (e) {
    console.warn('catch :: jswidget :: getjswidget', e)
    return 'error'
  }
}
