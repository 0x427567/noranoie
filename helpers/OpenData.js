'use strict'

import axios from 'axios'
import queryString from 'querystring'

const apiUrl = 'http://data.coa.gov.tw/Service/OpenData/TransService.aspx'

export default class OpenData {
  static async list () {
    const params = queryString.stringify({
      UnitId: 'QcbUEzN6E6DL',
      '$top': 30
    })

    return axios.get(`${apiUrl}?${params}`)
  }

  static async view (animalId) {
    const params = queryString.stringify({
      UnitId: 'QcbUEzN6E6DL',
      animal_id: animalId
    })

    return axios.get(`${apiUrl}?${params}`)
  }
}
