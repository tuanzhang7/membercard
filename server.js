/**
 * Created by tuanzhang on 13/4/2016.
 */

'use strict';

const Hapi = require('hapi');
const Good = require('good');
var mongoose =require('mongoose') ;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/environment');

var packageController = require('./server/api/package/package.controller');
var membercardController = require('./server/api/membercard/membercard.controller');
var visitController = require('./server/api/visit/visit.controller');
// Create a server with a host and port
var seed= require('./server/config/seed');
// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./server/config/seed'); }


const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method:  ['GET'],
    path:'/api/package',
    handler: packageController.index
});
server.route({
    method:  ['GET'],
    path:'/api/package/{id}',
    handler: packageController.show
});
server.route({
    method:  ['POST'],
    path:'/api/package',
    handler: packageController.create
});

server.route({
    method:  ['GET'],
    path:'/api/membercard',
    handler: membercardController.index
});
server.route({
    method:  ['GET'],
    path:'/api/membercard/{id}',
    handler: membercardController.show
});
server.route({
    method:  ['POST'],
    path:'/api/membercard',
    handler: membercardController.create
});
server.route({
    method:  ['GET'],
    path:'/api/visit/{fromDate}/{toDate}',
    handler: visitController.index
});
server.route({
    method:  ['GET'],
    path:'/api/visit/getCurrentVisits/{branch}',
    handler: visitController.getCurrentVisits
});
server.route({
    method:  ['POST'],
    path:'/api/visit/checkin',
    handler: visitController.checkIn
});
server.route({
    method:  ['PUT'],
    path:'/api/visit/checkout/{id}',
    handler: visitController.checkOut
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
