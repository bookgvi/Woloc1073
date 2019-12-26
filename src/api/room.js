import api from './instance'
import roomMock from 'src/mocks/room'
import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const room = new AbstractAPI(`${API_URL}/room`)
room.getDefaultPrices = async function () {
  const r = {
    data: Object.assign({}, roomMock)
  }
  return r
}
room.getEmpty = async function () {
  try {
    const r = await api.get(`${API_URL}/room/additions`)
    return r.data.data
  } catch (e) {
    console.warn('catch :: room :: getEmptyDataForRoom', e)
  }
}
room.getBackgrounds = async function (id) {
  try {
    const r = await api.get(`${API_URL}/room/backgrounds`)
    return r.data.data
  } catch (e) {
    console.warn('catch :: room :: getBackgrounds', e)
  }
}
room.getInteriors = async function (id) {
  try {
    const r = await api.get(`${API_URL}/room/interiors`)
    return r.data.data
  } catch (e) {
    console.warn('catch :: room :: getInteriors', e)
  }
}
room.getCharacteristics = async function (id) {
  try {
    const r = await api.get(`${API_URL}/room/characteristics`)
    return r.data.data
  } catch (e) {
    console.warn('catch :: room :: getCharacteristics', e)
  }
}
room.getExtras = async function (id) {
  try {
    const r = await api.get(`${API_URL}/room/extras`)
    return r.data.data
  } catch (e) {
    console.warn('catch :: room :: getExtras', e)
  }
}
