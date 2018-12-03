'use strict'

import pug from 'pug'

const basePath = './views'
const template = {
  index: `${basePath}/index.pug`,
  about: `${basePath}/about.pug`
}

export default class Pug {
  static async render (options = {}) {
    return new Promise((resolve, reject) => {
      let page

      if (!template[options.template]) {
        reject()
      }

      try {
        page = pug.compileFile(template[options.template])
      } catch (error) {
        reject(error)
      }

      try {
        resolve(page(options))
      } catch(error) {
        reject(error)
      }
    })
  }
}
