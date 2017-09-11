const { v4 } = require('uuid');
const db = require('./dynamodb');

const create = async (event, context, callback) => {
  const timestamp = new Date().getTime();
  const { entry, domain } = JSON.parse(event.body);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: v4(),
      entry,
      domain,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    await db.put(params).promise();
    const response = { statusCode: 200, body: JSON.stringify(params.Item) };
    callback(null, response);
  } catch (err) {
    console.log(err);
    callback(new Error('Couldn\'t create the entry item.'));
    return;
  }
};

module.exports = create;
