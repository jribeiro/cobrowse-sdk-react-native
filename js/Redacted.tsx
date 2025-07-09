import {
  View,
  NativeModules
} from 'react-native'
import { throttle } from 'lodash'
import { createCobrowseHoC, useCobrowseRefs } from './BaseComponent'
import type { RefHandlingComponent } from './BaseComponent'

const { CobrowseIO: CobrowseIONative } = NativeModules

const namespace = 'Redact'
const redactedTags = new Set<number>()
const sendRedactionUpdates = throttle(() => {
  CobrowseIONative.setRedactedTags([...redactedTags])
}, 50)

function remove (tag: number | null): void {
  if (tag != null) {
    redactedTags.delete(tag)
    sendRedactionUpdates()
  }
}

function add (tag: number | null): void {
  if (tag != null) {
    redactedTags.add(tag)
    sendRedactionUpdates()
  }
}

export function useRedaction<T> (shouldWarnUnhandledRefs = true, componentName = ''): (node: T | null) => void {
  return useCobrowseRefs<T>(namespace, add, remove, shouldWarnUnhandledRefs, componentName)
}

export function redact<T, P extends {} = {}> (Component: RefHandlingComponent<T, P>): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> {
  return createCobrowseHoC<T, P>(namespace, useRedaction)(Component)
}

const Redacted = redact(View)
export default Redacted
