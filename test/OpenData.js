'use strict'

const assert = require('assert')
const OpenData = require('../lib/DataGovTw')
const opendata = new OpenData

describe('OpenData', function() {
  describe('data.gov.tw', function() {
    describe('#query()', function() {
      it('Without any parameters', function(done) {
        opendata.query()
          .then(result => {
            assert.equal(24, result.length)
            done()
          })
      })

      it('Assign first 10 rows', function(done) {
        opendata.query({
          $top: 10
        })
          .then(result => {
            assert.equal(10, result.length)
            done()
          })
      })
    })
  })
})
