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
    const {accountId} = data;

    if (!accountId) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        {
          error: 'missing accountId.',
          data: event.body
        });
      return callback(null, response);
    }

    // Find the account in test accounts in the config file.
    const account = config.find(
      acc => acc.accountId === String(accountId));

    if (account) {
      response.body = JSON.stringify(
        {
          message: account.message
        });
    } else {
      response.statusCode = 401;
      response.body = JSON.stringify(
        {
          error: 'Test account does not exist.',
          data: event.body
        });
    }

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
