var handleResponse = function(response) {
  return response.data;
};

var handleError = function(exception) {
  var { response: { data: { error } } } = exception;
  throw new Error(error);
}

module.exports = { handleResponse, handleError };