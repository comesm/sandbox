const Lab = require('lab');
const lab = (exports.lab = Lab.script());
const server = require('../server');
const expect = require('code').expect;
const supertest = require('supertest');
const express = require('express');

const app = express();


lab.test('find all friends', (done) =>{


    server.create(({ register }) => {
     
    register(app);

    expect(app).to.exist();
    supertest(app)
     .get('/users')
     .end((err, res) => {

        expect(err).to.exist();
        expect(res.statusCode).to.equal(200);
        expect(res.body.users).to.be.an.array();
        expect(res.body.users[0].username).to.be.a.string();
        expect(res.body.users[0].friends).to.be.a.number();
        expect(res.body.users[0].plays).to.be.a.number();
        expect(res.body.users[0].uri).to.be.a.string();
     })

    });


})

lab.test('find single user', (done) =>{

    server.create(({ register }) => {
    register(app);
    expect(app).to.exist();
    supertest(app)
     .get('/users/patience_samet')
     .end((err, res) => {

        expect(err).to.exist();
        expect(res.statusCode).to.equal(200);
        expect(res.body.users).to.be.an.array();
        expect(res.body.users[0].username).to.be.a.string();
        expect(res.body.users[0].friends).to.be.a.number();
        expect(res.body.users[0].tracks).to.be.a.number();
        expect(res.body.users[0].uri).to.be.a.string();
     })

    });


})