exports.handler = (event, context, callback) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        currentTime: Math.floor(Date.now() / 1000),
      }),
    }
    
    return callback(null, response)
  }
  