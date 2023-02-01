import { z } from "zod";

type EnvVariables = Record<string, string | undefined>;

/**
 * ZodEnv is a wrapper around zod to parse env variables
 * @param schema zod schema
 * @param envs env variables
 * @example
 * const env = new ZodEnv(
 *  z.object({
 *   PORT: z.string(),
 *   HOST: z.string(),
 *   DEBUG: booleanAsString(),
 *   LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),
 *  }))
 *
 */
export class ZodEnv<Schema extends z.AnyZodObject> {
  /**
   * @internal
   *
   * The parsed envs
   */
  _envs: z.infer<Schema>;

  /**
   *
   * @param schema zod schema
   * @param envs env variables (optional)
   *
   * Creates a new instance of ZodEnv with the given schema and envs.
   * If envs are not provided, it will try to use process.env as envs and throw an error if process is not defined.
   *
   * @example
   * const env = new ZodEnv(
   * z.object({
   *    PORT: z.string(),
   *    HOST: z.string(),
   *    DEBUG: booleanAsString(),
   *    LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]),
   * }))
   */
  constructor(private readonly schema: Schema, envs?: EnvVariables) {
    let _envs: EnvVariables;
    if (envs) {
      _envs = envs;
    } else {
      if (typeof process === "undefined") {
        throw new Error(
          "process is not defined. Please provide envs as second argument"
        );
      }
      _envs = process.env;
    }
    this._envs = this.parse(_envs);
  }

  /**
   *
   * @param env env variables
   * @internal
   * @returns parsed envs
   *
   * Parses the given envs using the schema
   */
  private parse(env: NodeJS.ProcessEnv): z.infer<Schema> {
    return this.schema.parse(env);
  }

  /**
   *
   * @param key - key of the env variable to get
   * @param defaultValue - default value to return if the env variable is not defined
   * @returns  the value of the env variable or the default value if the env variable is not defined.
   *
   * Gets the value of the env variable with the given key.
   * If the env variable is not defined, and the key is not optional, it will throw an error.
   * If the env variable is not defined, and the key is optional, it will return the default value.
   *
   * @example
   * const env = new ZodEnv(
   * z.object({
   *   PORT: z.string(),
   *   HOST: z.string().optional(),
   *   DEBUG: booleanAsString().optional().default(false),
   *   LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).optional().default("info"),
   * }), {
   *    PORT: "3000",
   * })
   *
   * env.get("PORT") // "3000"
   * env.get("HOST") // undefined
   * env.get("HOST", "localhost") // "localhost"
   * env.get("DEBUG") // false
   * env.get("DEBUG", true) // false
   * env.get("LOG_LEVEL") // "info"
   *
   */
  get<K extends keyof z.infer<Schema>, D extends z.infer<Schema>[K]>(
    key: K,
    defaultValue?: D
  ): D extends undefined
    ? z.infer<Schema>[K] | undefined
    : NonNullable<z.infer<Schema>[K]> {
    const value = this._envs[key];

    if (typeof value !== "undefined") {
      return value;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return undefined as any;
  }

  /**
   *
   * @returns the parsed envs
   *
   * Gets all the parsed envs according to the schema
   */
  getAll(): z.infer<Schema> {
    return this._envs;
  }

  /**
   *
   * @returns the schema
   */
  getSchema(): Schema {
    return this.schema;
  }
}
