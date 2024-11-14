
// Mapping
const mapping = {
  '2': 'a',
  '22': 'b',
  '222': 'c',
  '3': 'd',
  '33': 'e',
  '333': 'f',
  '4': 'g',
  '44': 'h',
  '444': 'i',
  '5': 'j',
  '55': 'k',
  '555': 'l',
  '6': 'm',
  '66': 'n',
  '666': 'o',
  '7': 'p',
  '77': 'q',
  '777': 'r',
  '7777': 's',
  '8': 't',
  '88': 'u',
  '888': 'v',
  '9': 'w',
  '99': 'x',
  '999': 'y',
  '9999': 'z'
};

// Regex to match the above mapping
const pattern = /\*([2-9]{1,4})\*/g;

// Function to replace the sequences
function replaceDigitWithLetter(inputStr) {

   // Use replace method with a callback to replace using the mapping
  return inputStr.replace(pattern, (match, digits) => {
      // Return the corresponding letter from the mapping
      return mapping[digits] || match;
  });
}

// Regex to validate that the account
//  has 4 numbers between 1 and 9 and one lowercase alphanet
const accountPattern = /^(?=(?:.*[1-9]){4})(?=(?:.*[a-z]){1})[1-9a-z]{5}$/;

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
        { message: 'missing accountId.',
          input:  data
        });
      return callback(null, response);
    }
    normalizedAccountId = replaceDigitWithLetter(accountId);

    if (accountPattern.test(normalizedAccountId)) {
      response.body = JSON.stringify(
        {
          success: true,
          accountId: normalizedAccountId
        });
    } else {
      response.statusCode = 401;
      response.body = JSON.stringify(
        {
          message: 'Invalid account id.',
          accountId: normalizedAccountId
        });
    }

    return callback(null, response);
  } catch (error) {
    response.statusCode = 500;
    response.body = JSON.stringify(
      {
        message: 'Internal error',
        error: error.message
      });

    return callback(null, response);
  }
}
