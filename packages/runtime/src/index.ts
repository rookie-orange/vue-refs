import type { Ref, VNodeRef } from "vue";

declare const ForwardedRefTarget: unique symbol;

export type ForwardedRef<T = any> = Ref<T | null> & {
  readonly [ForwardedRefTarget]?: VNodeRef;
};

export function useForwardedRef<T = any>(_factory?: () => unknown): ForwardedRef<T> {
  throw new Error("useForwardedRef() must be compiled away by vue-refx.");
}
