// TODO: Sort this out a bit..
const update = db => async (event, context, callback) => {
  try {
    const timestamp = new Date().getTime();
    const { entry, domain } = JSON.parse(event.body);
    const updateAttributeDomain = dmn => dmn ? ({ '#domain': 'domain' }) : {};
    const updateExpressionAttributeValue = dmn => dmn ? ({ ':domain': dmn }) : {};
    const updateExpression = dmn => `SET #entry = :entry, ${dmn ? '#domain = :domain,' : ''} updatedAt = :updatedAt`;

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: event.pathParameters.id,
      },
      ExpressionAttributeNames: {
        '#entry': 'entry',
        ...updateAttributeDomain(domain),
      },
      ExpressionAttributeValues: {
        ':entry': entry,
        ':updatedAt': timestamp,
        ...updateExpressionAttributeValue(domain)
      },
      UpdateExpression: updateExpression(domain),
      ReturnValues: 'ALL_NEW',
    };
    const res = await db.update(params).promise();
    const response = { statusCode: 200, body: JSON.stringify(res) };
    callback(null, response);
  } catch (err) {
    console.log(err);
    callback(new Error('Couldn\'t update the entry.'));
    return;
  }
};

module.exports = update;
