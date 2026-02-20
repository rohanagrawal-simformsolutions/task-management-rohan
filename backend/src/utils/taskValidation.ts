import { TaskPriority, TaskStatus } from "../models/task.model";
import { CreateTaskDto, UpdateTaskDto } from "../models/task.dto";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const MAX_TITLE_LENGTH = 20;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || typeof value === "string";

const isValidStatus = (value: unknown): value is TaskStatus =>
  Object.values(TaskStatus).includes(value as TaskStatus);

const isValidPriority = (value: unknown): value is TaskPriority =>
  Object.values(TaskPriority).includes(value as TaskPriority);

const isValidDateString = (value: unknown): value is string => {
  if (!isNonEmptyString(value)) {
    return false;
  }
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

const isTodayOrFutureDate = (value: string): boolean => {
  const date = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() >= today.getTime();
};

const isWithinNextDays = (value: string, days: number): boolean => {
  const date = new Date(value);
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + days);
  return date.getTime() <= end.getTime();
};

const validateDueDate = (
  dueDate: unknown,
  priority: TaskPriority | undefined,
  errors: string[],
  isRequired: boolean,
): void => {
  if (dueDate === undefined) {
    if (isRequired) {
      errors.push("dueDate is required and must be a valid date string");
    }
    return;
  }

  if (!isValidDateString(dueDate)) {
    errors.push(
      isRequired
        ? "dueDate is required and must be a valid date string"
        : "dueDate must be a valid date string when provided",
    );
    return;
  }

  if (!isTodayOrFutureDate(dueDate)) {
    errors.push("dueDate must be today or a future date");
    return;
  }

  if (priority === TaskPriority.High && !isWithinNextDays(dueDate, 7)) {
    errors.push("dueDate must be within 7 days for high priority tasks");
  }
};

export const validateCreateTaskInput = (payload: unknown): ValidationResult => {
  const errors: string[] = [];
  const data = payload as Partial<CreateTaskDto>;

  if (!isNonEmptyString(data.title)) {
    errors.push("title is required and must be a non-empty string");
  } else if (data.title.trim().length > MAX_TITLE_LENGTH) {
    errors.push(`title must be at most ${MAX_TITLE_LENGTH} characters`);
  }

  if (!isOptionalString(data.description)) {
    errors.push("description must be a string when provided");
  }

  if (!isValidStatus(data.status)) {
    errors.push(
      `status must be one of: ${Object.values(TaskStatus).join(", ")}`,
    );
  }

  if (!isValidPriority(data.priority)) {
    errors.push(
      `priority must be one of: ${Object.values(TaskPriority).join(", ")}`,
    );
  }

  validateDueDate(data.dueDate, data.priority, errors, true);

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateUpdateTaskInput = (payload: unknown): ValidationResult => {
  const errors: string[] = [];
  const data = payload as Partial<UpdateTaskDto>;

  if (data.title !== undefined && !isNonEmptyString(data.title)) {
    errors.push("title must be a non-empty string when provided");
  } else if (
    typeof data.title === "string" &&
    data.title.trim().length > MAX_TITLE_LENGTH
  ) {
    errors.push(`title must be at most ${MAX_TITLE_LENGTH} characters`);
  }

  if (!isOptionalString(data.description)) {
    errors.push("description must be a string when provided");
  }

  if (data.status !== undefined && !isValidStatus(data.status)) {
    errors.push(
      `status must be one of: ${Object.values(TaskStatus).join(", ")}`,
    );
  }

  if (data.priority !== undefined && !isValidPriority(data.priority)) {
    errors.push(
      `priority must be one of: ${Object.values(TaskPriority).join(", ")}`,
    );
  }

  validateDueDate(data.dueDate, data.priority, errors, false);

  return {
    valid: errors.length === 0,
    errors,
  };
};
