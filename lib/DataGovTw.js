'use strict'

const http = require('http')
const queryString = require('querystring')
const baseUrl = 'http://data.coa.gov.tw/Service/OpenData/AnimalOpenData.aspx'

class DataGovTw {
  constructor() {}

  query(filter) {
    return new Promise((resolve, reject) => {
      if (typeof filter === 'undefined') {
        filter = {
          $top: 24,
          $skip: 1
        }
      }

      filter['$skip'] = (filter['$skip'] - 1) * filter['$top']

      http.get(baseUrl + '?' + queryString.stringify(filter), result => {
        let rawData = ''

        result
          .setEncoding('utf8')
          .on('data', (chunk) => {
            rawData += chunk
          })
          .on('end', () => {
            resolve(JSON.parse(rawData))
          })
          .on('error', (err) => {
            reject(err)
          })
      })
    })
  }
}

module.exports = DataGovTw
