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
  confirmMessage: function(data, response) {
    return response;
  },
  getMessages: function(data, response) {
    return response;
  },
  verifyAccount: function(data, response) {
    return response;
  },
  updatePin: function(data, response) {
    return response;
  },
  updateOutboundStatus: function(data, response) {
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
