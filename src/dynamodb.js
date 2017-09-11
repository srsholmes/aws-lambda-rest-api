const AWS = require('aws-sdk');

const getOptions = offline =>
  offline
    ? ({ region: 'localhost', endpoint: 'http://localhost:8000' })
    : {}

const client = new AWS.DynamoDB.DocumentClient(getOptions(process.env.IS_OFFLINE));

module.exports = client;
