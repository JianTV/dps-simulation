exports.handler = (event, context) => {
    try {
      if (event.httpMethod !== "POST") {
        return {
          statusCode: 405,
          body: JSON.stringify({ message: "Method Not Allowed" }),
        };
      }

      const twilioEvent = JSON.parse(event.body);

      console.log("Received Twilio Event:", twilioEvent);

      // Process event data as needed

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Event received successfully" }),
      };
    } catch (error) {
      console.error("Error processing event:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error" }),
      };
    }
  };
