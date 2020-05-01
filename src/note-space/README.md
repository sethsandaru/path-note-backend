# Note Space Module
This module will handle all the things around the `Note Space` scope.

## RestAPI Documentation
RestPath: `/note-space`


**Note**: For the API with a * (star). Those APIs need authorization in order to request.

### [POST] /note-space/create
- Desc: Create a new note space for user
- URL: `/note-space/create`
- Content-Type & Accept-Type: `application/json`
- Body:
```javascript
{
	"email": "phattranminh96@gmail.com",
	"name": "Workout Note",
	"description": "My private workout note",
	"hasPassword": true,
	"password": "phat",
	"visitorCanView": false,
	"visitorCanEdit": false,
	"noteKey": "seth-phat-workout-note" // `sometimes` rule
}
```
- Result-Success:
```json
{
    "status": true,
    "object": {
        "id": 4,
        "noteKey": "bxavjm"
    }
}
```
- Result-Error (Sample but same structure):
```json
{
    "statusCode": 400,
    "message": "Note-Key is already taken. Please choose another one.",
    "error": "Bad Request"
}
```

### [GET] /note-space/availability/{noteKey}
- Desc: This API will help us to check if user can access the Note or not
- URL: `/note-space/availability/{noteKey}`
- Content-Type & Accept-Type: `application/json`

### [POST] /note-space/login
- Desc: This API will check the Note's access password. Only available for Note with password.
- URL: `/note-space/login`
- Content-Type & Accept-Type: `application/json`

### [GET] /note-space/get (*)
- Desc: This API will check the Note's access password. Only available for Note with password.
- URL: `/note-space/get`
- Content-Type & Accept-Type: `application/json`
