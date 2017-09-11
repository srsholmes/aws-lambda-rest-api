const db = require('./dynamodb');

const del = async (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    await db.delete(params).promise();
    const response = { statusCode: 200, body: JSON.stringify({}) };
    callback(null, response);
  } catch (err) {
    console.log(err);
    callback(new Error('Couldn\'t delete the entry.'));
    return;
  }

};

module.exports = del;
