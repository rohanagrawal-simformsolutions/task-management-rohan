# Submission Summary

## Track Chosen

<!-- Mark your choice with [x] -->

- [x] Backend Only
- [ ] Frontend Only
- [ ] Full-Stack (Both)

## GitHub Copilot Usage Summary

<!-- Describe how you used AI throughout the test. Be specific about when and how you leveraged AI tools. -->

Used AI to draft and refine backend REST endpoints, validation flow, and error handling. It helped shape the in-memory task CRUD logic, ensure consistent HTTP status codes, and apply input sanitization/validation in controllers. Also used it to summarize key decisions for the submission.

## Key Prompts Used

<!-- List 3-5 important prompts you used with your AI assistant -->

1. "Create CRUD endpoints for tasks with in-memory storage in Express + TypeScript."
2. "Add validation and sanitization for create/update task payloads."
3. "Implement sorting by due date and proper HTTP status codes for errors."
4. "Prevent updates to completed tasks and return a 409 response."
5. "Summarize AI usage and decisions for SUBMISSION.md."

## Design Decisions (optional)

<!-- Explain key architectural or implementation decisions you made and why -->

- **Decision 1:** Used in-memory array for task storage
  - **Reasoning:** Keeps the backend simple and aligns with the no-database requirement.

- **Decision 2:** Centralized validation and sanitization utilities
  - **Reasoning:** Ensures consistent input checks and reduces duplication across controllers.

- **Decision 3:** Disallowed updates for completed tasks
  - **Reasoning:** Preserves task integrity and enforces a clear business rule.

- **Decision 4:** Added task priority enum with stricter due date rules
  - **Reasoning:** High-priority tasks must be due within 7 days.

- **Decision 5:** Sorted task list by due date with query control
  - **Reasoning:** Default asc sort and optional `sortOrder=desc` for UX flexibility.

## Challenges Faced

<!-- Optional: Describe any challenges encountered and how you overcame them -->

Ensuring consistent validation and error responses across endpoints; addressed by using shared validation helpers and a centralized error handler.

## Time Breakdown

<!-- Optional: Approximate time spent on each phase -->

- Planning & Setup: 5 minutes
- Core Implementation: 20 minutes
- Testing & Debugging: 5 minutes
- Additional Requirements (30-min mark): 10 minutes
- Additional Requirements (45-min mark): 15 minutes
- Optional Challenge (if attempted): 0 minutes

## Optional Challenge

<!-- If you attempted an optional challenge, specify which one -->

[ ] Not Attempted
[x] Option 1: Request Logging Middleware
[ ] Option 2: API Pagination
[x] Option 3: Advanced Validation
[ ] Option 4: Task Filtering & Search
[ ] Option 5: Form Validation & UX
[ ] Option 6: Drag-and-Drop Task Reordering
[ ] Option 7: Local Storage / Offline Support
[ ] Option 8: Real-time Updates
[ ] Option 9: Task Statistics Dashboard

## Additional Notes

<!-- Any other information you'd like to share about your implementation -->

Backend implemented as per requirements with clear validation and error handling.
Added Winston request logging with execution time format and detailed validation errors.

---

## Submission Checklist

<!-- Verify before submitting -->

- [x] Code pushed to private GitHub repository
- [x] All mandatory requirements completed
- [x] Code is tested and functional
- [ ] README updated (if needed)
- [x] This SUBMISSION.md file completed
- [ ] MS Teams recording completed and shared
- [x] GitHub repository URL provided to RM
- [ ] MS Teams recording link provided to RM
