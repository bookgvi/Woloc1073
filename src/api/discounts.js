import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const discounts = new AbstractAPI(`${API_URL}/rooms/discounts`)
