import { z } from "zod";

export const booleanAsString = () =>
  z
    .enum(["true", "false", ""])
    .or(z.boolean())
    .nullish()
    .transform((value) => {
      return value === "true" || value === true;
    });
