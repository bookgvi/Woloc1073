import { AbstractAPI } from './AbstractAPI'
const API_URL = process.env.API_CABINET_URL
export const organizationNotes = new AbstractAPI(`${API_URL}/dashboard/organization-notes`)
