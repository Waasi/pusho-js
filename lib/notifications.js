var utils = require('./utils');
var { Socket } = require('phoenix-socket');

var push = function(conn, fingerprint, payload) {
  return conn
    .post('/api/notifications', { payload, fingerprint })
    .then(utils.handleResponse)
    .catch(utils.handleError);
};

var subscribe = function(conn, fingerprint, handler) {
  var { config: { wsURL } } = conn;
  var logger = loggerConfig();

  var socket = new Socket(`${wsURL}/socket`, logger);
  socket.connect();

  var channel = socket.channel(`notification:${fingerprint}`, {})
  channel.join();
  channel.on(`notification:${fingerprint}`, handler);
  return channel;
}

var unsubscribe = function(subscription) {
  return subscription.leave();
}

var loggerConfig = function() {
  return {
    logger: ((kind, msg, data) => { console.log(`${kind}: ${msg}`, data) })
  }
}

module.exports = { push, subscribe, unsubscribe };