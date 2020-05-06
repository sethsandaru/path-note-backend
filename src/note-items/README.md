# Note Items Module
This module will handle all the things around the `Note Items` scope.

## RestAPI Documentation
RestPath: `/note-items`


**Note**: For the API with a * (star). Those APIs need authorization in order to request.

### [GET] /note-items/list/{noteSpaceId} (*)
- Desc: Retrieve all note items belong into the specific noteSpaceID 
- URL: `/note-items/list`
- Content-Type & Accept-Type: `application/json`
- Header-Required:
    - `Note-Space-Access-Key` => `API_HASH_KEY`
        - Only for protected Note with a password.
- Result-Success:
```json
{
  "coming": "soon"
}
```