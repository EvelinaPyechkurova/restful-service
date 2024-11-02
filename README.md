Base URL:
http://localhost:3000

Teacher Endpoints

1. Get Teacher by Query Parameters
Endpoint: /teachers
Method: GET
Query Parameters:
name: Filters teachers by name (optional).
surname: Filters teachers by surname (optional).
subject: Filters teachers by subject ID (optional).
Description: Retrieves a list of teachers based on specified filters.
Response:
200 OK: List of teachers matching query parameters.
500 Internal Server Error: Server error.

2. Get Teacher by ID
Endpoint: /teachers/{id}
Method: GET
URL Parameters:
id - Teacher's ID (required).
Description: Retrieves details of a single teacher by ID.
Response:
200 OK: Teacher details object.
404 Not Found: If no teacher is found.
400 Bad Request: If the ID is invalid.

3. Create a New Teacher
Endpoint: /teachers
Method: POST
Request Body:
json
{
  "name": "string",
  "surname": "string",
  "phone": "string",
  "email": "string"
}
Description: Adds a new teacher to the database.
Response:
201 Created: Confirmation message if created successfully.
400 Bad Request: If required fields are missing or invalid.

4. Update a Teacher
Endpoint: /teachers/{id}
Method: PATCH
URL Parameters:
id - Teacher's ID (required).
Request Body:
json
{
  "name": "string",
  "surname": "string",
  "phone": "string",
  "email": "string"
}
Description: Updates details for a specific teacher.
Response:
200 OK: Confirmation message if updated.
404 Not Found: If no teacher found for given ID.
400 Bad Request: If data is invalid.

5. Delete a Teacher
Endpoint: /teachers/{id}
Method: DELETE
URL Parameters:
id - Teacher's ID (required).
Description: Deletes a teacher by ID.
Response:
200 OK: Confirmation message if deleted.
404 Not Found: If no teacher is found.

Subject Endpoints

1. Get Subjects by Query Parameters
Endpoint: /subjects
Method: GET
Query Parameters:
name: Filters subjects by name (optional).
year: Filters subjects by academic year (optional).
trimester: Filters subjects by trimester (optional).
Description: Retrieves a list of subjects based on specified filters.
Response:
200 OK: List of subjects matching query parameters.
500 Internal Server Error: Server error.

2. Get Subject by ID
Endpoint: /subjects/{id}
Method: GET
URL Parameters:
id - Subject ID (required).
Description: Retrieves details of a single subject by ID.
Response:
200 OK: Subject details.
404 Not Found: If no subject is found.
400 Bad Request: If the ID is invalid.

3. Create a New Subject
Endpoint: /subjects
Method: POST
Request Body:
json
{
  "name": "string",
  "year": "number",
  "trimester": "string"
}
Description: Adds a new subject.
Response:
201 Created: Confirmation message if created.
400 Bad Request: If required fields are missing or invalid.

4. Update a Subject
Endpoint: /subjects/{id}
Method: PATCH
URL Parameters:
id - Subject ID (required).
Request Body:
json
{
  "name": "string",
  "year": "number",
  "trimester": "string"
}
Description: Updates details for a specific subject.
Response:
200 OK: Confirmation message if updated.
404 Not Found: If no subject found.
400 Bad Request: If data is invalid.

5. Delete a Subject
Endpoint: /subjects/{id}
Method: DELETE
URL Parameters:
id - Subject ID (required).
Description: Deletes a subject.
Response:
200 OK: Confirmation message if deleted.
404 Not Found: If no subject is found.

Lecture Endpoints
1. Get Lectures by Query Parameters
Endpoint: /lectures
Method: GET
Query Parameters:
subject: Filters lectures by subject ID (optional).
teacher: Filters lectures by teacher ID (optional).
type: Filters lectures by type (optional).
date: Filters lectures by date (optional).
Description: Retrieves a list of lectures based on specified filters.
Response:
200 OK: List of lectures matching query parameters.
500 Internal Server Error: Server error.

2. Get Lecture by ID
Endpoint: /lectures/{id}
Method: GET
URL Parameters:
id - Lecture ID (required).
Description: Retrieves details of a single lecture by ID.
Response:
200 OK: Lecture details.
404 Not Found: If no lecture is found.
400 Bad Request: If the ID is invalid.
3. Create a New Lecture
Endpoint: /lectures
Method: POST
Request Body:
json
{
  "subject": "string (subject ID)",
  "teacher": "string (teacher ID)",
  "type": "string",
  "date": "ISO date format string"
}
Description: Adds a new lecture.
Response:
201 Created: Confirmation message if created.
400 Bad Request: If required fields are missing or invalid.

4. Update a Lecture
Endpoint: /lectures/{id}
Method: PATCH
URL Parameters:
id - Lecture ID (required).
Request Body:
json
{
  "subject": "string (subject ID)",
  "teacher": "string (teacher ID)",
  "type": "string",
  "date": "ISO date format string"
}
Description: Updates details for a specific lecture.
Response:
200 OK: Confirmation message if updated.
404 Not Found: If no lecture found.
400 Bad Request: If data is invalid.

5. Delete a Lecture
Endpoint: /lectures/{id}
Method: DELETE
URL Parameters:
id - Lecture ID (required).
Description: Deletes a lecture.
Response:
200 OK: Confirmation message if deleted.
404 Not Found: If no lecture is found.