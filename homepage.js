'use strict'

const http = require('http')
const pug = require('pug')
const getRows = 20
const apiUrl = 'http://data.coa.gov.tw/Service/OpenData/AnimalOpenData.aspx?$top=' + getRows

module.exports.index = (event, context, callback) => {
  http.get(apiUrl, result => {
    result.setEncoding('utf8')

    let rawData = ''

    result.on('data', (chunk) => rawData += chunk)

    result.on('end', () => {
      const animals = JSON.parse(rawData);
      const template = pug.renderFile('./views/index.pug', {title: '首頁 | 野良の家', animals: animals})

      callback(null, {message: template, event})
    })
  })
}
