## Plan: Backend task management CRUD

Set up a new tasks API following the existing Express patterns: define a `Task` model, create in-memory storage in the controller layer, add RESTful routes, and wire everything into the app with consistent error handling. This keeps the structure aligned with current health route/controller and the centralized error middleware.

### Steps 3–6 steps, 5–20 words each

1. Review existing app wiring in backend/src/app.ts and error flow in backend/src/middleware/errorHandler.ts.
2. Define `Task` types and validation rules in backend/src/models to formalize payloads.
3. Implement in-memory store and CRUD handlers in backend/src/controllers, mirroring `health` controller style.
4. Add RESTful routes in backend/src/routes and mount them in backend/src/app.ts.
5. Ensure controllers throw HTTP errors consumed by `errorHandler` for consistent JSON error responses.

### Further Considerations 1–3, 5–25 words each

1. Use basic fields with validation, include status enum and due date.
2. Use UUIDs for task IDs and define missing-task errors.
3. Keep list endpoint simple with no filtering or pagination.
