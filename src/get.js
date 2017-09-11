const db = require('./dynamodb');

const get = params => async (event, context, callback) => {

  try {
    const res = await db.get(params).promise();
    console.log(res);
    const response = { statusCode: 200, body: JSON.stringify(res.Item) };
    callback(null, response);
  } catch (err) {
    console.error(error);
    callback(new Error('Couldn\'t fetch the entry.'));
    return;
  }

};

module.exports = get({
  TableName: process.env.DYNAMODB_TABLE,
  Key: {
    id: event.pathParameters.id,
  },
});
