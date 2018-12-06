'use strict'

import { OpenData, Pug } from '../helpers'
import { Areas } from '../config'

export const handler = async (event, context, callback) => {
  let animal

  try {
    animal = await OpenData.view(event.pathParameters.animalId)
    console.log(animal)
  } catch (error) {
    console.log(error.message)
  }

  try {
    const options = {
      template: 'index',
      title: `${Areas[animal.data[0].animal_area_pkid]}>${animal.data[0].animal_place}: ${animal.data[0].animal_subid}`,
      animals: animal.data
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
