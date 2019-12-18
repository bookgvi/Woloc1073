import { AbstractAPI } from './AbstractAPI'
import api from './instance'
const API_URL = process.env.API_CABINET_URL
export const studios = new AbstractAPI(`${API_URL}/settings/location`)
studios.uploadImage = async function (payload, config) {
  try {
    const status = await api.post(`${API_URL}/settings/location/upload-image`, payload, config)
    return status.data
  } catch (err) {
    console.warn('catch :: uploadImage', err)
    return err
  }
}
