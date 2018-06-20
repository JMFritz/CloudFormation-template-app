import * as dynamoDbLib from "./libs/dynamodb-lib"; // Helper function in lib folder
import { success, failure } from "./libs/response-lib"; // Helper function in lib folder

export async function main(event, context, callback) {
  const params = {
    TableName: "cf-templates",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      templateId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
