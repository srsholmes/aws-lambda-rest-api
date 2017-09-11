const db = require('./dynamodb');

const list = async (event, context, callback) => {
  const params = { TableName: process.env.DYNAMODB_TABLE };

  try {
    const res = await db.scan(params).promise();
    const response = { statusCode: 200, body: JSON.stringify(res) };
    callback(null, response);
  } catch (err) {
    console.log(err);
    callback(new Error('Couldn\'t fetch the entries.'));
    return;
  }


};

module.exports = list  ;
