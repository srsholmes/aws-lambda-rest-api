const get = db => async (event, context, callback) => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id,
      },
    };
    const res = await db.get(params).promise();
    const response = { statusCode: 200, body: JSON.stringify(res.Item) };
    callback(null, response);
  } catch (err) {
    callback(new Error('Couldn\'t fetch the entry.'));
    return;
  }

};

module.exports = get;
