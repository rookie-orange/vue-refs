<script setup lang="ts">
import { useForwardedRef } from "vue-refs";

const ref = useForwardedRef<HTMLInputElement>();
</script>

<template>
  <input :ref="ref" />
</template>
