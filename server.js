'use strict';

const mockData = require('./mockData')

const Hapi = require('hapi')
const Boom = require('boom')
const Joi = require('joi')

const mongoose = require('mongoose')

const User = require('./models/user')

// Connect to Mongoose
mongoose.connect('mongodb://localhost/test')
var db = mongoose.connection

const server = new Hapi.Server()
server.connection({ port: 3000, host: 'localhost' })

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    // Filter data based on query
    const result = mockData.filter(
      object => object.name === request.query.name
    )

    if(result.length < 1) {
      reply(Boom.notFound('Person does not exist'))
    }
    else {
      reply(result)
    }
  }
});

// Get all Users
server.route({
  method: 'GET',
  path: '/getusers',
  handler: function (request, reply) {
    User.getUsers((err, users) => {
      if(err){
        throw err
      }
      reply(users)
    })
  }
});

// Get user by id
server.route({
  method: 'GET',
  path: '/id/{id}',
  handler: function (request, reply) {
    User.getUserById(request.params.id, (err, user) => {
  		if(err){
  			throw err;
  		}
      reply(user)
  	})
  }
});

// Add user
server.route({
  method: 'GET',
  path: '/add/{name}',
  handler: function (request, reply) {
    const newUser = {
      firstname: request.params.name,
      lastname: request.params.name
    }
    User.addUser(newUser, (err, newUser) => {
  		if(err){
  			throw err;
  		}
      reply(newUser)
  	})
  }
});

// Remove user by id
server.route({
  method: 'GET',
  path: '/remove/{id}',
  handler: function (request, reply) {
    User.removeUser(request.params.id, (err, user) => {
  		if(err){
  			throw err;
  		}
      reply(user)
  	})
  }
});


server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
