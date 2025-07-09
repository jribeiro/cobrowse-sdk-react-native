import { PropsWithoutRef, type ForwardRefExoticComponent, type RefAttributes, type ComponentClass, type Ref, type PropsWithChildren, type ForwardedRef } from 'react';
declare type Callback = (view: number | null) => void;
export declare function useCobrowseRefs<T>(namespace: string, add: Callback, remove: Callback, shouldWarnUnhandledRefs?: boolean, componentName?: string): (node: T | null) => void;
export declare type RefHandlingComponent<T, P> = ComponentClass<P & {
    ref?: Ref<T>;
}, any> | ForwardRefExoticComponent<PropsWithChildren<P> & RefAttributes<T>>;
export declare function createCobrowseHoC<T, P extends {}>(displayNamePrefix: string, useCobrowseRefs: (enabled: boolean, displayName?: string) => ForwardedRef<T>): (Component: RefHandlingComponent<T, P>) => ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
export {};
//# sourceMappingURL=BaseComponent.d.ts.map