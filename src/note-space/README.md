# Note Space Module
This module will handle all the things around the `Note Space` scope.

## RestAPI Documentation
RestPath: `/note-space`


**Note**: For the API with a * (star). Those APIs need authorization in order to request.
### [POST] Create a new Note Space
- Desc:
- URL: `/note-space/create`

### [GET] Check the Availability of the Note
- Desc: This API will help us to check if user can access the Note or not
- URL: `/note-space/availability/{noteKey}`

### [POST] Note Space Password Submit
- Desc: This API will check the Note's access password. Only available for Note with password.
- URL: `/note-space/login`

### [GET] Retrieve Note Space Details *
- Desc: This API will check the Note's access password. Only available for Note with password.
- URL: `/note-space/get`