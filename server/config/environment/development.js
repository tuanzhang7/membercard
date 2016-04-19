'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/freport'
    //uri: 'mongodb://172.30.11.195:3306/freport'
  },

  // Seed database on startup
  seedDB: false

};
