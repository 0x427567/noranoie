'use strict'

const http = require('http')
const pug = require('pug')
const template = pug.compileFile('./views/index.pug')
const getAnimals = require('../lib/data-gov-tw')
const response = {
  headers: {
    'Content-Type': 'text/html'
  }
}

module.exports.get = (event, context, callback) => {
  console.log(event.queryStringParameters)

  const page = (event.queryStringParameters && event.queryStringParameters.page) ? event.queryStringParameters.page : 1

  getAnimals({
    $skip: page
  })
  .then(animals => {
    response.statusCode = 200
    response.body = template({title: '首頁 | 野良の家', animals: animals})

    callback(null, response)
  })
  .catch(err => {
    response.statusCode = 500
    response.body = 'Error'

    callback(null, response)
  })
}
