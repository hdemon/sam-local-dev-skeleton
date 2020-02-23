const AWS = require("aws-sdk");

const dynamoOptions = {
  endpoint: process.env.DYNAMO_DB_ENDPOINT,
  region: process.env.DYNAMO_DB_REGION,
};

const documentClient = new AWS.DynamoDB.DocumentClient(dynamoOptions);

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async function(event, context, callback) {
  try {
    const params = {
      TableName: "Data"
    };
    const result = await documentClient.scan(params).promise();
    response = {
      statusCode: 200,
      body: JSON.stringify(result)
    };

    return response;
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: err
    };
  }
};
