var crypto = require('crypto');
var axios = require('axios');

module.exports = function(baseURL, apiKey) {
  var wsURL = baseURL.replace(/http/, "ws");

  var client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    transformRequest: [
      function(data, headers) {
        var body = JSON.stringify(data);
        var signature = crypto
                            .createHmac('sha256', apiKey)
                            .update(body)
                            .digest('hex');

        var request = Object.assign(data, { signature });
        return JSON.stringify(request);
      }
    ]
  });

  client.config = { baseURL, wsURL };
  return client;
};