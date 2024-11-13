const config = require('../shared/config');

exports.handler = (event, context, callback) => {

  response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json', // Ensure the response is JSON
    }
  };

  try {
    const accountPin = JSON.parse(event.body);
    const {accountId, pin} = accountPin;

    if (!accountId || !pin) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        { message: 'missing accountId or pin'});
      return callback(null, response);
    }

    // Find the account in test accounts in the config file.
    const account = config.find(
      acc => acc.accountId === accountId && acc.pin === String(pin));

    if (account) {
      response.body = JSON.stringify({ success: true });
    } else {
      response.statusCode = 401;
      response.body = JSON.stringify(
        { message: 'Account authenticaiton failed',
          accountId: accountId,
          pin: pin
         });
    }

    return callback(null, response);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(
      { message: 'Internal error', error: error.message });
    return callback(null, response);
  }
}
