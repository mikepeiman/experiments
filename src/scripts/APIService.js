import axios from 'axios'
import Airtable from 'airtable'

const API_URL = process.env.VUE_APP_AIRTABLE_URI
const API_KEY = process.env.VUE_APP_AIRTABLE_API_KEY
const BASE = process.env.VUE_APP_AIRTABLE_BASE
let airtable = new Airtable({ apiKey: API_KEY, endpointUrl: API_URL })
export class APIService {
  constructor() {

  }
  getItems() {
    const url = `${API_URL}`
    return axios.get(url).then(response => response.data)
  }
  getItem(id) {
    const url = `${API_URL}/${id}`
    return axios.get(url).then(response => response.data)
  }
}