'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const vision = require('vision');
const ejs = require('ejs');

const config = require('./conf');

// Create a server with a host and port
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '.build/public'),
      },
    },
  },
});

server.connection({
  host: config.env.server.host,
  port: config.env.server.port,
});

server.register(Inert, () => {});

const rootHandler = function (request, reply) {
  reply.view('index', {
    cdn: config.env.cdn,
    server: config.env.server,
    min: config.env.min,
  });
};

server.register(vision, err => {
  if (err)
    throw err;

  server.views({
    engines: {
      ejs: ejs,
    },
    relativeTo: __dirname,
    path: '.build/templates',
    isCached: config.env.name !== 'development',
  });

  server.route({ method: 'GET', path: '/', handler: rootHandler });
  server.route({ method: 'GET', path: '/notif', handler: rootHandler });
  server.route({ method: 'GET', path: '/kix-like', handler: rootHandler });
});

server.route({
  method: 'GET',
  path: '/{files*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true,
    },
  },
});

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {
    return reply('hello world');
  },
});

// Start the server
server.start(err => {
  if (err)
    throw err;

  console.log('Server running at:', server.info.uri);
});
