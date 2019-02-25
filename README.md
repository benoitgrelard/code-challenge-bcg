# Ideas board

## Implementation notes

- The code is fairly pragmatic as it's a simple app
- It was only tested in Chrome and no effort was spent on cross browser (using css grid, custom properties, etc)
- The backend is simulated with randomly delayed promises
- The UI doesn't make any optimistic updates, but rather waits for each “call” to complete before updating
- I took a few liberties on the design front to improve user experience:
  - 150 \* 150 was too small
  - other treatment for input focus

## Challenge

Consider an idea/memo board where you can create an idea, edit existing ideas and delete old ideas. Each idea should have a unique id (read-only), a creation date (read-only), a title (editable), and a body (editable), which can contain a maximum of 140 characters. Assume that there is a backend REST service with the following endpoints:

- `GET ideas/ -> [{“id”: “:id”, “created_date”: “:created_date”, “title”: “:title”, “body”: “:body”}, {}, ...]`
- `GET ideas/new -> { “id”: “:id”, “created_date”: “:created_date” }`
- `POST idea/update { “id”: “:id”, “title”: “:title”, “body”: “:body” }`
- `POST idea/delete { “id”: “:id” }`

Assume that the back-end makes of use of standard HTTP success and error codes.

### Required goals

- [x] Ideas should be displayed as tiles, with a height and width of 150px and a 10px margin, aligned horizontally to fit screen width. You can hard code a few ideas to get you started.
- [x] There should be a button that can be clicked to add a new blank idea, and the title field should be focused to prompt the user to begin typing. A request should be made to a backend REST service to get an id for the new idea, as well as the created_date.
- [x] The title and body fields should be editable. These fields should have no border when blurred, but a solid light grey border when they are focused. Blurring any of these fields should trigger an update request to the backend REST service.
- [x] Each tile should have a delete icon which should only be visible when hovering over the tile. Clicking it should remove the idea and make an update request to the backend REST service.

### Stretch goals

- [x] Implement sorting that changes with a dropdown. The sort options should be title and created_date.
- [x] Implement a character counter that is displayed when the body field is edited and the remaining character count is <15. Hide the counter when the remaining characters count is >15.
- [x] Use localStorage to persist the ideas so that they persist after a page refresh.
- [x] Implement a notification to tell the user that edits have been successfully saved. Ensure the
      notification isn’t intrusive.
