import type { ForwardedRef, Ref } from 'react'

export function mergeRefs<T> (refs: Array<ForwardedRef<T>>): Ref<T> {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ref.current = value
      }
    })
  }
}
