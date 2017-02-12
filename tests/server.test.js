const request = require('supertest-as-promised')
const {expect} = require('chai')

const app = require('../app')


describe('server', () => {
  it('serves the html page', () =>
    request(app)
      .get(`/`)
      .expect(200)
  )
})

//needs more work - does not fail when it should

