import express, { Application } from "express";
import healthRoutes from "./routes/health.routes";
import tasksRoutes from "./routes/tasks.routes";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use("/", healthRoutes);
app.use("/tasks", tasksRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
