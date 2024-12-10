import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { z } from "zod";
import { verifySignature } from "./utils/crypo";

const schema = z.object({
  name: z.string(),
});

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const headers = event.headers;
  const signature = headers["x-signature"];

  if (!signature) {
    return {
      statusCode: 400,
      body: "Missing signature",
    };
  }

  if (!event.body || schema.safeParse(event.body).success) {
    return {
      statusCode: 400,
      body: "Incorrect body",
    };
  }

  if (!verifySignature(signature, event.body ?? "")) {
    return {
      statusCode: 400,
      body: "Invalid signature",
    };
  }

  return {
    statusCode: 200,
    body: "Hello, World!",
  };
};
