exports.handler = (event, context, callback) => {
    const response = {
      statusCode: 200,
      headers: {
         'Content-Type': 'application/json', // Ensure the response is JSON
      },
      body: JSON.stringify({
        currentTime: Math.floor(Date.now() / 1000),
      }),
    }
    
    return callback(null, response)
  }
  
