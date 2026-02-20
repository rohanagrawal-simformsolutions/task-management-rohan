import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { Task, TaskPriority, TaskStatus } from "../models/task.model";
import { CreateTaskDto, UpdateTaskDto } from "../models/task.dto";
import {
  validateCreateTaskInput,
  validateUpdateTaskInput,
} from "../utils/taskValidation";
import { createHttpError } from "../middleware/errorHandler";
import { sanitizeTaskPayload } from "../utils/taskSanitization";

const tasks: Task[] = [];

export const listTasks = (req: Request, res: Response): void => {
  const sortOrder =
    typeof req.query.sortOrder === "string"
      ? req.query.sortOrder.toLowerCase()
      : "asc";
  const direction = sortOrder === "desc" ? -1 : 1;

  const sortedTasks = [...tasks].sort((a, b) => {
    const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    return diff * direction;
  });

  res.status(200).json({ data: sortedTasks });
};

export const getTaskById = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const task = tasks.find((item) => item.id === req.params.id);

  if (!task) {
    next(createHttpError("Task not found", 404));
    return;
  }

  res.status(200).json({ data: task });
};

export const createTask = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const sanitized = sanitizeTaskPayload(req.body);
  const validation = validateCreateTaskInput(sanitized);

  if (!validation.valid) {
    next(createHttpError("Validation failed", 400, validation.errors));
    return;
  }

  const payload = sanitized as unknown as CreateTaskDto;
  const now = new Date().toISOString();

  const task: Task = {
    id: uuidv4(),
    title: payload.title,
    description: payload.description,
    status: payload.status ?? TaskStatus.Pending,
    priority: payload.priority ?? TaskPriority.Medium,
    dueDate: new Date(payload.dueDate).toISOString(),
    createdAt: now,
    updatedAt: now,
  };

  tasks.push(task);

  res.status(201).json({ data: task });
};

export const updateTask = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const sanitized = sanitizeTaskPayload(req.body);
  const validation = validateUpdateTaskInput(sanitized);

  if (!validation.valid) {
    next(createHttpError("Validation failed", 400, validation.errors));
    return;
  }

  const index = tasks.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    next(createHttpError("Task not found", 404));
    return;
  }

  const payload = sanitized as unknown as UpdateTaskDto;
  const current = tasks[index];

  if (current.status === TaskStatus.Completed) {
    next(createHttpError("Completed tasks cannot be updated", 409));
    return;
  }

  const updated: Task = {
    ...current,
    title: typeof payload.title === "string" ? payload.title : current.title,
    description:
      typeof payload.description === "string"
        ? payload.description
        : current.description,
    status: payload.status ?? current.status,
    priority: payload.priority ?? current.priority,
    dueDate:
      typeof payload.dueDate === "string"
        ? new Date(payload.dueDate).toISOString()
        : current.dueDate,
    updatedAt: new Date().toISOString(),
  };

  tasks[index] = updated;

  res.status(200).json({ data: updated });
};

export const deleteTask = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const index = tasks.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    next(createHttpError("Task not found", 404));
    return;
  }

  tasks.splice(index, 1);

  res.status(204).send();
};
