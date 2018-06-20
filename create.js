import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib"; // Helper function in lib folder
import { success, failure } from "./libs/response-lib"; // Helper function in lib folder

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "cf-templates",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      templateId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      diagram: data.diagram,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
