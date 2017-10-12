'use strict'

const http = require('http')
const pug = require('pug')
const template = pug.compileFile('./views/index.pug')
const OpenData = require('../lib/DataGovTw')
const opendata = new OpenData
const response = {
  headers: {
    'Content-Type': 'text/html'
  }
}

module.exports.get = (event, context, callback) => {
  const page = (event.queryStringParameters && event.queryStringParameters.page) ? parseInt(event.queryStringParameters.page) : 1

  opendata.query({
    $top: 24,
    $skip: page
  })
    .then(animals => {
      response.statusCode = 200
      response.body = template({title: '首頁 | 野良の家', animals: animals, prePage: page - 1, nextPage: page + 1, currentPage: page})

      callback(null, response)
    })
    .catch(err => {
      response.statusCode = 500
      response.body = 'Error'

      callback(null, response)
    })
}
