## Plan: Add logging and advanced validation

Introduce Winston-based request logging and strengthen validation with title length, due-date rules, and sanitization. This preserves current controller flow while adding structured logs and clearer validation feedback.

### Steps

1. Add Winston dependency in backend/package.json.
2. Create request logger middleware in backend/src/middleware.
3. Register logger before routes in backend/src/app.ts.
4. Enforce title max length 20 and due-date rules in backend/src/utils/taskValidation.ts.
5. Return detailed validation error arrays from backend/src/controllers/tasks.controller.ts.

### Further Considerations

1. Due-date rule: must be today or a future date (future-only or allow today’s date).
2. Sanitization: trim and collapse whitespace for text fields.
3. Standardize validation error response shape for clients.
4. Logger: Winston, logs all requests as `[METHOD] /endpoint - Execution time: Xms`.
