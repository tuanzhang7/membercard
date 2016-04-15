/**
 * Created by tuanzhang on 13/4/2016.
 */

'use strict';

const Hapi = require('hapi');
const Good = require('good');

var packageController = require('./server/api/package/package.controller');
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method:  ['GET', 'POST'],
    path:'/api/package',
    handler: function (request, reply) {
        return reply('hello world');
    }
});
server.route({
    method:  ['GET'],
    path:'/api/package/{id}',
    handler: packageController.show
});

// Start the server
server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }
    server.start((err) => {
        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
