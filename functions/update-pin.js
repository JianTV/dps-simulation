const config = require('../shared/config');

exports.handler = (event, context, callback) => {

  response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json', // Ensure the response is JSON
    }
  };
  try {
    const accountPins = JSON.parse(event.body);
    const {accountId, oldPin, newPin} = accountPins;

    if (!accountId || !oldPin || !newPin) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        {
          message: 'missing accountId or pin or new pin',
          data: event.body
        });
      return callback(null, response);
    }

    // Find the account in the array
    const account = config.find(
      acc => acc.accountId === accountId && acc.pin === String(oldPin));

    if (account) {
      account.pin = newPin
      response.body = JSON.stringify(
        {
          oldPin: oldPin,
          account: account
         });
    } else {
      response.statusCode = 401;
      response.body = JSON.stringify(
        {
          error: 'Account authenticaiton failed',
          data: event.body
        });
    }

    return callback(null, response);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(
      {
        error: error.message
      });
    return callback(null, response);
  }
}
