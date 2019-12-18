import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const promocodes = new AbstractAPI(`${API_URL}/rooms/promocodes`)
