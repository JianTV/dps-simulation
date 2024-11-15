exports.handler = (event, context, callback) => {

  response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json', // Ensure the response is JSON
    }
  };

  const {category, lg} = JSON.parse(event.body);

  SystemMessages = {};
  switch (category){
    case "MessageProcessFlow":
      switch (lg) {
          default: // english
            systemMessages = {
                "FetchMessagesError": "Sorry, we have problems to get the messages, please try again later.",
                "NoMessage": "Congratulation, you have no messages to confirm.",
                "OneMessage": "You have one message to confirm.",
                "MultipleMessages": "You have multiple messages.",
                "MessageConfirmed": "This message has been confirmed.",
                "MessageSkipped": "THis message has been skipped.",
                "MessagesProcessed": "Thanks, all messasges have been processed."
            };
      };
      break;
    default:
      response.statusCode = 400;
      response.body = JSON.stringify(
        {error: "Unrecgnoized category"});
      return callback(null, response);
  }

  response.body = JSON.stringify(
    {systemMessages: systemMessages});
  return callback(null, response);
};
