import { decode } from "html-entities";
import validator from "validator";

export function sanitizeInput(input: any): string | undefined {
  if (input === null || input === undefined) {
    return undefined;
  }
  let value = String(input).trim();

  if (value === "") {
    return undefined;
  }

  value = validator.escape(value);

  value = decode(value);

  value = value
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/ on\w+="[^"]*"/g, "")
    .replace(/javascript:[^\s]*/g, "")
    .replace(/data:[^\s]*/g, "")
    .replace(/vbscript:[^\s]*/g, "");

  return value;
}

export function hasSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER)\b)/i,
    /(--)|(\/\*|\*\/)|[';]$/,
    /\b(OR|AND)\b.*(=|>|<|\bin\b|\blike\b)/i,
    /\b(sys|information_schema)\b/i,
  ];
  return sqlPatterns.some((pattern) => pattern.test(input));
}

export function sanitizeEmail(email: string | undefined): string | undefined {
  if (!email) return undefined;

  const sanitized = sanitizeInput(email.toLowerCase());
  return validator.isEmail(sanitized || "") ? sanitized : undefined;
}

export function sanitizeObject<T extends object>(obj: T): Partial<T> {
  const sanitized: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      (sanitized as any)[key] = sanitizeObject(value as object);
    } else if (Array.isArray(value)) {
      (sanitized as any)[key] = value.map((item) =>
        typeof item === "object" ? sanitizeObject(item) : sanitizeInput(item)
      );
    } else {
      (sanitized as any)[key] = sanitizeInput(value);
    }
  }

  return sanitized;
}
