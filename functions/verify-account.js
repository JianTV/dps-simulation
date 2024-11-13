const config = require('../../shared/config');

exports.handler = (event, context, callback) => {

  try {
    const data = JSON.parse(event.body);
    (accountId, pin) = data;
    if (!accountId || !pin) {
      return {
        statusCode: 400, // Bad Request
        headers: {
          'Content-Type': 'application/json', // Ensure the response is JSON
        },
        body: JSON.stringify({ message: 'missing accountId or pin'}),
      };
    }
    return {
      headers: {
        'Content-Type': 'application/json', // Ensure the response is JSON
      },
      body: JSON.stringify({ message: 'okay'}),
    };
  } catch (error) {
    return {
      statusCode: 400, // Bad Request
      headers: {
        'Content-Type': 'application/json', // Ensure the response is JSON
      },
      body: JSON.stringify({ message: 'Invalid JSON', error: error.message }),
    };
  }
}
