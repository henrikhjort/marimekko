
### GET /products

#### Endpoint description
Retrieve list of all available products.

#### URL
`GET /api/products`

#### Method
`GET`

#### Authentication level
`Anonymous`

#### Query parameters
None for this endpoint.

#### Request body
None for `GET` requests.

#### Success response
**Code:** 200 OK
**Content:** 
```json
"success": true,
"message": "Products fetched successfully.",
"data": [
  {
    "id": "6623a57628936d70e45c5e78",
    "name": "Toppa Pikkuinen Unikko",
    "category": "Quilted jacket",
    "description": "The Pikkuinen Unikko quilted jacket blends timeless style with practical warmth, making it an essential    addition to your cool-weather wardrobe. Crafted from a durable, water-resistant fabric, this jacket features a vibrant rendition of the iconic Unikko poppy print, reimagined in a smaller scale for a modern twist.",
    "productId": "093441-219",
    "priceVat0Euro": 350,
    "colors": [
      {
        "name": "Soft beige",
        "code": "#f2e6d0"
      },
      {
        "name": "Blush pink",
        "code": "#f5b3c4"
      }
    ]
  },
]
```

#### Sample call
```bash
curl -X GET "https://localhost:7071/api/products"
```


### POST /auth/check-email

#### Endpoint description
Verify user's email address in the first step of login.

#### URL
`POST /auth/check-email`

#### Method
`POST`

#### Authentication level
`Function`  (Assuming this refers to Azure Functions' authorization level)

#### Query parameters
None. Data should not be sent as query parameters for this endpoint.

#### Request body
**Required.**

```json
{
  "email": "example@email.com"
}
```

#### Success Response
**Code:** 200 OK
**Content:** 
```json
"success": true,
"message": "Email successfully verified",
"data": "<emailToken>",
```

#### Sample call
```bash
curl -X POST http://localhost:7071/api/auth/check-email \
-H "Content-Type: application/json" \
-d '{"email": "maija.poppanen@email.com"}'
```


### POST /auth/verify-code

#### Endpoint description
Verifies a user's login code against a stored hash after validating an email token and issues an access token upon successful verification.

#### URL
`POST /auth/verify-code`

#### Method
`POST`

#### Authentication level
`Function`

#### Headers
**Required.**
```plaintext
x-email-token: <email_token>
```
- `x-email-token`: A valid email token provided in the request header to authenticate the email associated with the code.

#### Request body
**Required.**
```json
{
  "email": "example@email.com",
  "code": "1234"
}
```

#### Success response
**Code:** 200 OK
**Content:** 
```json
{
  "success": true,
  "message": "Login successful",
  "data": "<access_token>"
}
```

#### Error responses
**Code:** 400 Bad Request
**Content:**
```json
{
  "success": false,
  "message": "Code is required"
}
```
**Code:** 401 Unauthorized
**Content:**
```json
{
  "success": false,
  "message": "Invalid token"
}
```
**Code:** 401 Unauthorized
**Content:**
```json
{
  "success": false,
  "message": "Invalid email or code"
}
```
**Code:** 500 Internal Server Error
**Content:**
```json
{
  "success": false,
  "message": "Failed to create access token"
}
```

#### Sample call
```bash
curl -X POST http://localhost:7071/api/auth/verify-code -H "Content-Type: application/json" -H "x-email-token: <email_token>" -d '{"email": "example@email.com", "code": "1234"}'
```


### GET /api/user

#### Endpoint description
Retrieve user details using a valid access token.

#### URL
`GET /api/user`

#### Method
`GET`

#### Authentication level
`Function`  (Assumes that Azure Functions' authorization level requires a valid access token)

#### Headers
**Required.**
```plaintext
Authorization: Bearer <access_token>
```
- `Authorization`: A valid access token provided in the request header to authenticate the user.

#### Request body
None for `GET` requests.

#### Success response
**Code:** 200 OK
**Content:** 
```json
{
  "success": true,
  "message": "User details loaded successfully",
  "data": {
    "userId": 1,
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}
```

#### Error Responses
**Code:** 401 Unauthorized
**Content:**
```json
{
  "success": false,
  "message": "Access token is required"
}
```
**Code:** 401 Unauthorized
**Content:**
```json
{
  "success": false,
  "message": "Invalid token"
}
```
**Code:** 404 Not Found
**Content:**
```json
{
  "success": false,
  "message": "User not found"
}
```

#### Sample call
```bash
curl -X GET http://localhost:7071/api/user -H "Authorization: Bearer <access_token>" -H "Content-Type: application/json"
```


