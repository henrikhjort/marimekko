import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { getUserByEmail } from "../lib/user";
import { verifyLoginCode } from "../lib/hash";
import {
  getEmailTokenFromRequest,
  verifyEmailToken,
  createAccessToken,
} from "../lib/token";
import {
  invalidDataResponse,
  unauthorizedResponse,
  serverErrorResponse,
} from "../lib/responses";

// Code exists
/*
curl -X POST http://localhost:7071/api/auth/verify-code \
-H "Content-Type: application/json" \
-H "x-email-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haWphLnBvcHBhbmVuQGVtYWlsLmNvbSIsInR5cGUiOiJlbWFpbCIsImlhdCI6MTcxMzQ2OTU3OSwiZXhwIjoxNzEzNDY5ODc5fQ.2uEFvVwhTM5h21gBUVA9k_nwjlJGe3TLX7LNjuJux_k" \
-d '{"email": "maija.poppanen@email.com", "code": "1234"}'
*/

// Code does not exist
/*
curl -X POST http://localhost:7071/api/auth/verify-code \
-H "Content-Type: application/json" \
-H "x-email-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haWphLnBvcHBhbmVuQGVtYWlsLmNvbSIsInR5cGUiOiJlbWFpbCIsImlhdCI6MTcxMzQ2ODkwMywiZXhwIjoxNzEzNDY5MjAzfQ.56cNnpQaK_tX2O5V1GrgNO8ddDAAAdPz-cmrvmIci1o" \
-d '{"email": "maija.poppanen@email.com", "code": "1235"}'
*/

// Bad token
/*
curl -X POST http://localhost:7071/api/auth/verify-code \
-H "Content-Type: application/json" \
-H "x-email-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haWphLnBvcHBhbmVuQGVtYWlsLmNvbSIsInR5cGUiOiJlbWFpbCIsImlhdCI6MTcxMzQ2ODkwMywiZXhwIjoxNzEzNDY5MjAzfQ.56cNnpQaK_tX2O5V1GrgNO8ddDAAAdPz-cmrvmIci1o" \
-d '{"email": "maija.poppanen@email.com", "code": "1234"}'
*/

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const code = req.query.code || (req.body && req.body.code);
  if (!code) {
    context.res = invalidDataResponse("Code is required");
    return;
  }

  // Retrieve token from headers.
  const emailToken = getEmailTokenFromRequest(req);
  if (!emailToken) {
    context.res = unauthorizedResponse("Email token is required");
    return;
  }

  // Verify email token
  const email = verifyEmailToken(emailToken);
  if (!email) {
    context.res = unauthorizedResponse("Invalid token");
    return;
  }

  // Get user by email
  const user = await getUserByEmail(email);
  if (!user) {
    context.res = unauthorizedResponse("Invalid email");
    return;
  }

  // Verify that given code matches the stored hash
  const codeHash = user.codeHash;
  const codeMatches = await verifyLoginCode(code, codeHash);
  if (!codeMatches) {
    context.res = unauthorizedResponse("Invalid code");
    return;
  }

  const accessToken = createAccessToken(user);
  if (!accessToken) {
    context.res = serverErrorResponse("Failed to create access token");
    return;
  }

  // Return success response
  context.res = {
    status: 200,
    body: {
      success: true,
      message: "Login successful",
      data: accessToken,
    },
  };
};

export default httpTrigger;
