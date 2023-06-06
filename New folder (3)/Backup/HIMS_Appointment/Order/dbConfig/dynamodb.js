const AWS = require('aws-sdk');
//const dynamoose = require('dynamoose');
// Set up AWS credentials and region
AWS.config.update({
  accessKeyId: 'AKIA2TVEYKFLYIHWNFD5',
  secretAccessKey: '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',
  region: 'us-east-1',
  debug: true
});
//dynamoose.aws.sdk=AWS
const dynamoose = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
module.exports = dynamoose