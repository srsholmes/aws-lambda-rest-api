const db = require('./dynamodb');

const del = params => async (event, context, callback) => {
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

module.exports = del({
  TableName: process.env.DYNAMODB_TABLE,
  Key: {
    id: event.pathParameters.id,
  },
});
