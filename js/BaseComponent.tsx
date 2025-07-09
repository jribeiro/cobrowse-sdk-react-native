import React, {
  forwardRef,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  PropsWithoutRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type ComponentClass,
  type Ref,
  type PropsWithChildren,
  type ForwardedRef
} from 'react'
import { findNodeHandle } from 'react-native'
import { mergeRefs } from './mergeRefs'

type Callback = (view: number | null) => void

export function useCobrowseRefs<T> (
  namespace: string,
  add: Callback,
  remove: Callback,
  shouldWarnUnhandledRefs = true,
  componentName = ''
): (node: T | null) => void {
  const ref = useRef<number | null>(null)

  const setRef = useCallback((node: T | null) => {
    let hasRemovedRef = false
    if (ref.current != null) {
      hasRemovedRef = true
      remove(ref.current)
    }

    if (node != null) {
      // @ts-expect-error: findNodeHandle accepts any native component
      const view = findNodeHandle(node)

      if (view != null) {
        add(view)
        ref.current = view
      } else {
        console.warn(`Failed to apply ${namespace} to ${componentName} due to view not found`)
      }
    } else if (!hasRemovedRef) {
      console.warn(
        `Failed to apply ${namespace} to ${componentName} due to null node handle – make sure you are forwarding refs`
      )
    }
  }, [add, remove, namespace, componentName])

  useEffect(() => {
    const currentView = ref.current

    if (shouldWarnUnhandledRefs && currentView == null) {
      console.warn(
        `Failed to apply ${namespace} to ${componentName} due to null node handle – make sure the setRef function is called with the ref`
      )
    }

    return () => remove(currentView)
  }, [remove, namespace, componentName, shouldWarnUnhandledRefs])

  return setRef
}

export type RefHandlingComponent<T, P> =
  | ComponentClass<P & { ref?: Ref<T> }, any>
  | ForwardRefExoticComponent<PropsWithChildren<P> & RefAttributes<T>>

function isViewComponent<P> (Component: React.ComponentType<P>): boolean {
  return (Component as any).displayName === 'View' || (Component as any).name === 'View'
}

export function createCobrowseHoC<T, P extends {}> (
  displayNamePrefix: string,
  useCobrowseRefs: (enabled: boolean, displayName?: string) => ForwardedRef<T>
) {
  return function createCobrowseHoC (
    Component: RefHandlingComponent<T, P>
  ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
    const displayName = (Component as { displayName?: string }).displayName

    const Wrapped = forwardRef<T, P>(function ComponentFromHOC (props, ref) {
      const localRef = useCobrowseRefs(true, displayName)
      const refs = useMemo(() => mergeRefs([localRef, ref]), [localRef, ref])
      const componentProps = isViewComponent(Component)
        ? { ...props, collapsable: false }
        : props

      return <Component {...componentProps} ref={refs} />
    })

    Wrapped.displayName = `${displayNamePrefix}(${displayName ?? 'Component'})`
    return Wrapped
  }
}
