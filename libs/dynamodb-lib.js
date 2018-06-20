// Configures our dynamodb resource using the AWS SDK and uses promise method for managing asynchronous code

import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
