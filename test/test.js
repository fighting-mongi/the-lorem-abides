const application = require('../main.js');
const request = require('supertest');
const expect = require('chai').expect;

describe('GET requests', () => {
	it('should return the index page', () => {
		request.get('/', (done) => {

		})
	}),
	it('should return the amount of paragraphs specified by amount parameter', () => {
		request.get('/paragraph/:amount', (done) => {

		})
	}),
	it('should return the amount of sentences specified by amount parameter', () => {
		request.get('/sentence/:amount', (done) => {
			
		})
	})
	it('should return the amount of words specified by amount parameter', () => {
		request.get('/word/:amount', (done) => {
			
		})
	})
})
