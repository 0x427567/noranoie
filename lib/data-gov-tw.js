'use strict'

const http = require('http')
const apiUrl = 'http://data.coa.gov.tw/Service/OpenData/AnimalOpenData.aspx'
const queryString = require('querystring')
const animalPerPage = 24

module.exports = (query) => {
  query['$top'] = animalPerPage
  query['$skip'] = (query['$skip'] - 1) * animalPerPage

  const qs = queryString.stringify(query)

  return new Promise((resolve, reject) => {
    http.get(apiUrl + '?' + qs, result => {
      result.setEncoding('utf8')

      let rawData = ''

      result.on('data', (chunk) => {
        rawData += chunk
      })

      result.on('end', () => {
        resolve(JSON.parse(rawData))
      })
    })
  })
}
