const config = require('../shared/config');

const endPointsDict = {
  "getCallerSetting": function(data, response) {
    const {phone_number} = data;

    if (!phone_number) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        {
          error: 'missing phone_number.',
          data: data
        });
    } else {
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
    }
    return response;
  },
  getMessages: function(data, response) {
    const {accountId} = data;

    if (!accountId) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        {
          error: 'missing accountId.',
          data: data
        });
    } else {
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
            data: data
          });
      }
    }
    return response;
  },
  confirmMessage: function(data, response) {
    const {accountId, messageId} = data;

    if (!accountId) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        {
          message: 'missing accountId',
          data: data
        });
    } else {

      // Find the account in test accounts in the config file.
      const account = config.find(
        acc => acc.accountId === accountId);
    }
    return response;
  },
  verifyAccount: function(data, response) {
    const {accountId, pin} = data;

    if (!accountId || !pin) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        {
          message: 'missing accountId or pin',
          data: datas
        });
    } else {
      // Find the account in test accounts in the config file.
      const account = config.find(
        acc => acc.accountId === String(accountId) && acc.pin === String(pin));

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
    }
    return response;
  },
  updatePin: function(data, response) {
    const {accountId, oldPin, newPin} = data;

    if (!accountId || !oldPin || !newPin) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        {
          message: 'missing accountId or pin or new pin',
          data: data
        });
    } else {

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
            data: data
          });
      }
    }
    return response;
  },
  updateOutboundStatus: function(data, response) {
    // TODO: discuss with Jay and finalize the signature first.
    return response;
  }
};

exports.handler = (event, context, callback) => {

  response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json', // Ensure the response is JSON
    }
  };

  try {
    const data = JSON.parse(event.body);
    api = endPointsDict[data["request"]];
    return callback(null, api(data,response));
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
