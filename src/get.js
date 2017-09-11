const get = db => async (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    const res = await db.get(params).promise();
    const response = { statusCode: 200, body: JSON.stringify(res.Item) };
    callback(null, response);
  } catch (err) {
    console.error(error);
    callback(new Error('Couldn\'t fetch the entry.'));
    return;
  }

};

module.exports = get;
