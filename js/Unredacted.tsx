import { View, NativeModules } from 'react-native'
import { throttle } from 'lodash'
import { createCobrowseHoC, useCobrowseRefs, RefHandlingComponent } from './BaseComponent'

const CobrowseIONative = NativeModules.CobrowseIO

const namespace = 'Unredact'
const unredactedTags = new Set<number>()
const sendUnredactionUpdates = throttle(() => {
  CobrowseIONative.setUnredactedTags([...unredactedTags])
}, 50, { leading: false })

function remove (view: number | null): void {
  if (view != null) {
    unredactedTags.delete(view)
    sendUnredactionUpdates()
  }
}

function add (view: number | null): void {
  if (view != null) {
    unredactedTags.add(view)
    sendUnredactionUpdates()
  }
}

export function useUnredaction<T> (shouldWarnUnhandledRefs = true, componentName = ''): (node: T | null) => void {
  return useCobrowseRefs<T>(namespace, add, remove, shouldWarnUnhandledRefs, componentName)
}

export function unredact<T, P extends {} = {}> (Component: RefHandlingComponent<T, P>): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> {
  return createCobrowseHoC<T, P>(namespace, useUnredaction)(Component)
}

const Unredacted = unredact(View)
export default Unredacted
