const request = require('supertest');
const assert = require('chai');
const application = require('../main.js');

describe('GET /', () => {
  it('should return the index page', (done) => {
    request(application).get('/')

  })
})
