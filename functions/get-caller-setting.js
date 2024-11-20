const config = require('../shared/config');

// {{trigger.call.From}}
exports.handler = (event, context, callback) => {

  response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json', // Ensure the response is JSON
    }
  };

  try {
    const data = JSON.parse(event.body);
    const {phone_number} = data;

    if (!phone_number) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        {
          error: 'missing phone_number.',
          data: event.body
        });
      return callback(null, response);
    }

    account = {};
    switch (phone_number) {
      case "+16502768941":
        account = config[0];
        break;
      default:
        break;
    };

    response.body = JSON.stringify(
      {
          account: account
      });

    return callback(null, response);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(
      {
        error: error.message,
        data: event.body
      });
    return callback(null, response);
  }
}
