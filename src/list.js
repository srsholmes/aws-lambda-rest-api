const list = db => async (event, context, callback) => {
  try {
    const params = { TableName: process.env.DYNAMODB_TABLE };
    const res = await db.scan(params).promise();
    const response = { statusCode: 200, body: JSON.stringify(res) };
    callback(null, response);
  } catch (err) {
    callback(new Error('Couldn\'t fetch the entries.'));
    return;
  }
};

module.exports = list;
