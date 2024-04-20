import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { getAccessTokenFromRequest, verifyAccessToken } from "../lib/token";
import { getUserById } from "../lib/user";
import { unauthorizedResponse } from "../lib/responses";

// Valid token
/*
curl -X GET http://localhost:7071/api/user \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMzQ2OTU5MywiZXhwIjoxNzEzNTU1OTkzfQ.vZEAQbcv8fxV-t38mZ2FKW7seGpdNN3UTitzOMoQs7k" \
-H "Content-Type: application/json"
*/

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // Retrieve access token from headers.
  const accessToken = getAccessTokenFromRequest(req);
  if (!accessToken) {
    context.res = unauthorizedResponse("Access token is required");
    return;
  }

  // Verify access token
  const userId = verifyAccessToken(accessToken);
  if (!userId) {
    context.res = unauthorizedResponse("Invalid token");
    return;
  }

  // Load user data
  const user = await getUserById(userId);
  if (!user) {
    context.res = unauthorizedResponse("User not found");
    return;
  }

  context.res = {
    status: 200,
    body: {
      success: true,
      message: "User details loaded successfully",
      data: user,
    },
  };
};

export default httpTrigger;
