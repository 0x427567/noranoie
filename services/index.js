'use strict'

import { OpenData, Pug } from '../helpers'

export const handler = async (event, context, callback) => {
  let animals

  try {
    animals = await OpenData.list()
  } catch(error) {
    console.log(error.message)
  }

  try {
    const options = {
      template: 'index',
      title: 'Home',
      animals: animals.data
    }

    const html = await Pug.render(options)

      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
        },
        body: html,
      };

      return response

  } catch(error) {
    console.log(error.message)
  }
}
