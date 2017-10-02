'use strict'

const pug = require('pug')
const template = pug.compileFile('./views/about.pug')

module.exports.index = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: template({title: '關於我們 | 野良の家'}),
  };

  callback(null, response)
}
