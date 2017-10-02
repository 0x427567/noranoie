'use strict'

const http = require('http')
const pug = require('pug')
const template = pug.compileFile('./views/info.pug')

const apiUrl = 'http://data.coa.gov.tw/Service/OpenData/AnimalOpenData.aspx?$top=1&$skip=0&$filter=animal_id+like+'

module.exports.index = (event, context, callback) => {
  console.log(event)
  http.get(apiUrl + event.pathParameters.animalId, result => {
    result.setEncoding('utf8')

    let rawData = ''

    result.on('data', (chunk) => rawData += chunk)

    result.on('end', () => {
      const animal = JSON.parse(rawData);

      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
        },
        body: template({title: '待領養動物 | 野良の家', animal: animal[0]}),
      };

      callback(null, response)
    })
  })
}
