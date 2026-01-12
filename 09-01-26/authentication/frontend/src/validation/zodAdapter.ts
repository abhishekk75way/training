import { ZodError, type ZodTypeAny } from "zod";

export const zodValidator =
  (schema: ZodTypeAny) =>
  (value: unknown) => {
    try {
      schema.parse(value);
      return undefined;
    } catch (err) {
      if (err instanceof ZodError) {
        return err.issues[0]?.message ?? "Invalid input";
      }
      return "Invalid input";
    }
  };
