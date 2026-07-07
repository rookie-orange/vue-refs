import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    vite: "packages/vite/src/index.ts",
    runtime: "packages/runtime/src/index.ts"
  },
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  sourcemap: true,
  splitting: false,
  target: "es2022",
  external: ["vite", "vue"]
})
