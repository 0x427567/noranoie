'use strict'

import { Pug } from '../helpers'

export const handler = async (event, context, callback) => {
  try {
    const options = {
      template: 'about',
      title: '關於我們'
    }

    const html = await Pug.render(options)

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html'
      },
      body: html
    }

    return response
  } catch (error) {
    console.log(error.message)
  }
}
