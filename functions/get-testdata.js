const config = require('../shared/config');

exports.handler = (event, context, callback) => {

  response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json', // Ensure the response is JSON
    },
    body: JSON.stringify(
      {testdata: config}
    )
  };

  return callback(null, response);
};
