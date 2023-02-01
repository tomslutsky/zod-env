import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entryPoints: ["src/index.ts"],
    outDir: "dist",
    splitting: true,
    format: ["esm", "cjs"],
    clean: true,
    sourcemap: true,
    treeshake: true,
    dts: true,
    minify: !options.watch,
  };
});
