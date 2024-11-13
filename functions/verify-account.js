const config = require('../shared/config');

exports.handler = (event, context, callback) => {

  response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json', // Ensure the response is JSON
    }};

  try {
    const data = JSON.parse(event.body);
    const {accountId, pin} = data;
    if (!accountId || !pin) {
      response.statusCode = 400;
      response.body = JSON.stringify({ message: 'missing accountId or pin'});
      return callback(null, response);
    }
    response.body = JSON.stringify({ message: 'okay'});
    return callback(null, response);
  } catch (error) {
    response.statusCode = 400;
    response.body = JSON.stringify({ message: 'Invalid JSON', error: error.message });
    return callback(null, response);
  }
}
