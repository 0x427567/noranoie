'use strict'

const http = require('http')
const apiUrl = 'http://data.coa.gov.tw/Service/OpenData/AnimalOpenData.aspx?$TOP=20'

module.exports.query = (event, context, callback) => {
  http.get(apiUrl, result => {
    result.setEncoding('utf8')

    let rawData = ''

    result.on('data', (chunk) => rawData += chunk)

    result.on('end', () => {
      const animals = JSON.parse(rawData);

      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(animals),
      };

      callback(null, response)
    })
  })
}
