var createClient = require('./client');
var notifications = require('./notifications');

module.exports = { connect: createClient, notifications };