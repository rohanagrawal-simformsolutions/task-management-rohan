const sanitizeText = (value: string): string =>
  value.split(/\s+/).join(" ").trim();

export const sanitizeTaskPayload = (
  payload: unknown,
): Record<string, unknown> => {
  const data = payload as Record<string, unknown>;

  return {
    ...data,
    title:
      typeof data.title === "string" ? sanitizeText(data.title) : data.title,
    description:
      typeof data.description === "string"
        ? sanitizeText(data.description)
        : data.description,
    dueDate:
      typeof data.dueDate === "string" ? data.dueDate.trim() : data.dueDate,
  };
};
