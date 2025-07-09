/// <reference types="react" />
import type { RefHandlingComponent } from './BaseComponent';
export declare function useRedaction<T>(shouldWarnUnhandledRefs?: boolean, componentName?: string): (node: T | null) => void;
export declare function redact<T, P extends {} = {}>(Component: RefHandlingComponent<T, P>): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
declare const Redacted: import("react").ForwardRefExoticComponent<import("react-native").ViewProps & import("react").RefAttributes<unknown>>;
export default Redacted;
//# sourceMappingURL=Redacted.d.ts.map