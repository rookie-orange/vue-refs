# unplugin-vue-ref-prop

Vue compiler macro that forwards a component template ref into the child as a prop during SFC compilation.

```ts
import vue from "@vitejs/plugin-vue"
import RefProp from "unplugin-vue-ref-prop/vite"

export default defineConfig({
  plugins: [vue(), RefProp()]
})
```

```vue
<script setup lang="ts">
const ref = useRefProp<HTMLInputElement>()
</script>

<template>
  <input :ref="ref" />
</template>
```

Parent component:

```vue
<script setup lang="ts">
import { ref } from "vue"
import MyInput from "./MyInput.vue"

const input = ref<HTMLInputElement | null>(null)
</script>

<template>
  <MyInput ref="input" />
</template>
```

The macro is erased before Vue compiles the SFC. No Vue runtime patching is used.

## Types

Add the global macro type in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["unplugin-vue-ref-prop/global"]
  }
}
```
