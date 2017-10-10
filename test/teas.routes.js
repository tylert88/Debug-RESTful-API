const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('teas', function () {
  before(function () {
    this.resource = '/teas'
  })

  describe('index', function () {
    it('should return all of the requested resources', function (done) {
      chai.request(app)
        .get(this.resource)
        .end((err, res) => {
          expect(res.status, 'Return a status code of 200').to.equal(200)
          expect(res.body.data, 'All teas should be returned in the body via a `data` key').to.be.an('array')
          done()
        })
    })
  })

  describe('show', function () {
    it('should return the resource specified if it exists', function (done) {
      chai.request(app)
        .get(`${this.resource}/89bf4a36-3b74-4f79-ae80-c6ec9af8ea50`)
        .end((err, res) => {
          expect(res.status, 'Return a status code of 200').to.equal(200)
          expect(res.body.data, 'One tea should be returned in the body via a `data` key').to.be.an('object')
          done()
        })
    })

    it('should return a 404 if the specified resource does not exist', function (done) {
      chai.request(app)
        .get(`${this.resource}/1`)
        .end((err, res) => {
          expect(res.status, 'Return a status code of 404').to.equal(404)
          expect(res.body.error, 'Return an object with the error key').to.be.an('object')
          expect(res.body.error.message, 'The error object should contain a message key').to.be.ok
          done()
        })
    })
  })

  describe('create', function () {
    it('should create a new tea if the information provided is correct', function (done) {
      const newTea = { brand: 'The Republic of Tea', name: 'Dream by The Fire' }
      chai.request(app)
        .post(`${this.resource}`)
        .send(newTea)
        .end((err, res) => {
          expect(res.status, 'Return a status code of 201').to.equal(201)
          expect(res.body.data, 'One tea should be returned in the body via a `data` key').to.be.an('object')
          expect(res.body.data.id, 'One tea should be returned in the body via a `data` key').to.be.ok
          done()
        })
    })

    it('should return a 400 if the information provided is incorrect or invalid', function (done) {
      const newTea = { name: 'Dream by The Fire' }
      chai.request(app)
        .post(`${this.resource}`)
        .send(newTea)
        .end((err, res) => {
          expect(res.status, 'Return a status code of 400').to.equal(400)
          expect(res.body.error, 'Return an object with the error key').to.be.an('object')
          expect(res.body.error.message, 'The error object should contain a message key').to.be.ok
          done()
        })
    })
  })

  describe('update', function () {
    it('should update an existing tea when given correct information and a correct id', function (done) {
      const tea = {
        id: '89bf4a36-3b74-4f79-ae80-c6ec9af8ea50',
        brand: 'Celestial Seasonings',
        name: 'Classic Sleepytime'
      }

      chai.request(app)
        .put(`${this.resource}/${tea.id}`)
        .send(tea)
        .end((err, res) => {
          expect(res.status, 'Return a status code of 200').to.equal(200)
          expect(res.body.data, 'One tea should be returned in the body via a `data` key').to.deep.equal(tea)
          done()
        })
    })

    it('should return a 400 if the information is invalid', function (done) {
      const tea = {
        id: '89bf4a36-3b74-4f79-ae80-c6ec9af8ea50',
        name: 'Classic Sleepytime'
      }

      chai.request(app)
        .put(`${this.resource}/${tea.id}`)
        .send(tea)
        .end((err, res) => {
          expect(res.status, 'Return a status code of 400').to.equal(400)
          expect(res.body.error, 'Return an object with the error key').to.be.an('object')
          expect(res.body.error.message, 'The error object should contain a message key').to.be.ok
          done()
        })
    })

    it('should return a 404 if the id does not match an existing tea', function (done) {
      const tea = { id: '1', brand: 'Celestial Seasonings', name: 'Classic Sleepytime' }

      chai.request(app)
        .put(`${this.resource}/${tea.id}`)
        .send(tea)
        .end((err, res) => {
          expect(res.status, 'Return a status code of 404').to.equal(404)
          expect(res.body.error, 'Return an object with the error key').to.be.an('object')
          expect(res.body.error.message, 'The error object should contain a message key').to.be.ok
          done()
        })
    })
  })

  describe('destroy', function () {
    it('should destroy an existing resource if the id matches', function (done) {
      chai.request(app)
        .delete(`${this.resource}/89bf4a36-3b74-4f79-ae80-c6ec9af8ea50`)
        .end((err, res) => {
          expect(res.status, 'Return a status code of 204').to.equal(204)
          done()
        })
    })

    it('should return a 404 if the id does not match an existing tea', function (done) {
      chai.request(app)
        .delete(`${this.resource}/1`)
        .end((err, res) => {
          expect(res.status, 'Return a status code of 404').to.equal(404)
          expect(res.body.error, 'Return an object with the error key').to.be.an('object')
          expect(res.body.error.message, 'The error object should contain a message key').to.be.ok
          done()
        })
    })
  })
})
