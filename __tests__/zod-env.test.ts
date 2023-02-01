import { describe, it, expect } from "vitest";
import { z } from "zod";
import { ZodEnv } from "../src/index";
import { booleanAsString } from "../src/utils";

describe("zod-env", () => {
  it("should be able to parse envs", () => {
    const env = new ZodEnv(
      z.object({
        PORT: z.string(),
        HOST: z.string(),
        DEBUG: booleanAsString(),
        LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),
      }),
      {
        PORT: "3000",
        HOST: "localhost",
        DEBUG: "false",
        LOG_LEVEL: "info",
      }
    );
    expect(env.get("PORT")).toBe("3000");
    expect(env.get("HOST")).toBe("localhost");
    expect(env.get("DEBUG")).toBe(false);
    expect(env.get("LOG_LEVEL")).toBe("info");
  });
  it("should be able to parse envs with default values", () => {
    const env = new ZodEnv(
      z.object({
        PORT: z.string().optional(),
        HOST: z.string().optional(),
        DEBUG: booleanAsString().optional().default(false),
        LOG_LEVEL: z
          .enum(["debug", "info", "warn", "error"])
          .optional()
          .default("info"),
      })
    );
    expect(env.get("PORT", "3000")).toBe("3000");
    expect(env.get("HOST", "localhost")).toBe("localhost");
    expect(env.get("DEBUG", false)).toBe(false);
    expect(env.get("LOG_LEVEL", "info")).toBe("info");
  });

  it("should return all envs", () => {
    const env = new ZodEnv(
      z.object({
        PORT: z.string(),
        HOST: z.string(),
        DEBUG: booleanAsString(),
        LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),
      }),
      {
        PORT: "3000",
        HOST: "localhost",
        DEBUG: "false",
        LOG_LEVEL: "info",
      }
    );
    expect(env.getAll()).toEqual({
      PORT: "3000",
      HOST: "localhost",
      DEBUG: false,
      LOG_LEVEL: "info",
    });
  });
});
