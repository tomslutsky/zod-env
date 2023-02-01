

# Zod-Env
A simple library for parsing environment variables using [Zod]("https://zod.dev/")

## Installation
```bash
npm install zod-env
```
** Make sure to install zod as well **
```bash
npm install zod
```

## Basic Usage
```typescript
import { z } from "zod";
import {ZodEnv, booleanAsString} from "zod-env";

const zodEnv = new ZodEnv({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.string().default("development"),
  IS_PRODUCTION: booleanAsString().default(false),
});

zodEnv.get("PORT"); // 3000
zodEnv.get("NODE_ENV"); // "development"
zodEnv.get("IS_PRODUCTION"); // false
```

## Usage with default values
```typescript
import { z } from "zod";
import {ZodEnv, booleanAsString} from "zod-env";

const zodEnv = new ZodEnv({
  PORT: z.coerce.number().optional(),
  NODE_ENV: z.string().optional(),
  IS_PRODUCTION: booleanAsString().default(false),
});

zodEnv.get("PORT", "3000"); // 3000
zodEnv.get("NODE_ENV", "development"); // "development"
zodEnv.get("IS_PRODUCTION"); // false
```

## Usage with custom environment variables
If your environemnt variables are not in the default location, you can pass in a custom object to the constructor.
```typescript
import { z } from "zod";
import {ZodEnv, booleanAsString} from "zod-env";

const envs = window.__envs__ // or whatever your custom object is

const zodEnv = new ZodEnv({
  PORT: z.coerce.number().optional(),
  NODE_ENV: z.string().optional(),
  IS_PRODUCTION: booleanAsString().default(false),
}, envs);

```

