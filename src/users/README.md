# User Module
This module will handle all the things around the `User` scope.

## RestAPI Documentation
RestPath: `/users`

### [POST] Request for Login Link
- Description: User requests for a login link. We will email user's email.
- URL: `/users/login-request`
- Accept-Type: "application/json"
- Post-Body:
    - email (REQUIRED)
- Return `json`:
    - status - boolean
    - message - string