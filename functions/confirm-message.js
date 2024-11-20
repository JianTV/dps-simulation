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
    const {accountId, messageId} = data;

    if (!accountId) {
      response.statusCode = 400;
      response.body = JSON.stringify(
        { message: 'missing accountId'});
      return callback(null, response);
    }

    // Find the account in test accounts in the config file.
    const account = config.find(
      acc => acc.accountId === accountId);

    if (account) {
      // If messageId is empty, remove all messages
      if (!messageId) {
        account.messages = [];
      } else {
        // Find the message and remove it
        const index = account.messages.findIndex(
          msg => msg.id === String(messageId));
        if (index !== -1) {
          account.messages.splice(index, 1);
          response.body = JSON.stringify(
            {
              messages: account.messages
            });
        } else {
          response.statusCode = 401;
          response.body = JSON.stringify(
            {
              messages: 'Message does not exist for this account'
            });
        }
      }
    } else {
      response.statusCode = 401;
      response.body = JSON.stringify(
        {
          message: 'Test account does not exist'
        });
    }

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
