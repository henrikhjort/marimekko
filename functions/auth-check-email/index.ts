import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { verifyEmailExists } from "../lib/user";
import { createEmailToken } from "../lib/token";
import {
  invalidDataResponse,
  unauthorizedResponse,
  serverErrorResponse,
} from "../lib/responses";

// Email exists
/*
curl -X POST http://localhost:7071/api/auth/check-email \
-H "Content-Type: application/json" \
-d '{"email": "maija.poppanen@email.com"}'

curl -X POST https://hnrk-test-function-app.azurewebsites.net/api/auth/check-email \
-H "Content-Type: application/json" \
-d '{"email": "maija.poppanen@email.com"}'


*/

// Email does not exist
/*
curl -X POST http://localhost:7071/api/auth/check-email \
-H "Content-Type: application/json" \
-d '{"email": "kaija.poppanen@email.com"}'
*/

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const email = req.query.email || (req.body && req.body.email);
  if (!email) {
    context.res = invalidDataResponse("Email is required");
    return;
  }

  // Check if email exists in the database
  const emailExists = await verifyEmailExists(email);
  if (!emailExists) {
    context.res = unauthorizedResponse("Invalid email");
    return;
  }

  // Create token that is valid for 5 minutes.
  const emailToken = createEmailToken(email);
  if (!emailToken) {
    context.res = serverErrorResponse("Failed to create email token");
    return;
  }

  // Return success response
  context.res = {
    status: 200,
    body: {
      success: true,
      message: "Email successfully verified",
      data: emailToken,
    },
  };
};

export default httpTrigger;
