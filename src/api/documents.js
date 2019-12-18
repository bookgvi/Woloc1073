import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const documents = new AbstractAPI(`${API_URL}/documents`)
