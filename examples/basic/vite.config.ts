import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import VueRefs from "vue-refs/vite";

export default defineConfig({
  plugins: [vue(), VueRefs()],
});
