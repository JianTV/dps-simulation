const config = require('../shared/config');

exports.handler = (event, context, callback) => {

  response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json', // Ensure the response is JSON
    }
  };

  try {
    const data = JSON.parse(event.body);
    const {accountId, phoneNumber, type, status, message} = data;

    if (!accountId || !phoneNumber) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        {
          message: 'missing accountId or phoneNumber',
          data: event.body
        });
      return callback(null, response);
    }

    // Log the status, message, and take action accordingly
    // To implement in production

    return callback(null, response);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(
      {
        message: 'Internal error',
        error: error.message,
        data: event.body
      });

    return callback(null, response);
  }
}
