/// <reference types="react" />
import { RefHandlingComponent } from './BaseComponent';
export declare function useUnredaction<T>(shouldWarnUnhandledRefs?: boolean, componentName?: string): (node: T | null) => void;
export declare function unredact<T, P extends {} = {}>(Component: RefHandlingComponent<T, P>): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
declare const Unredacted: import("react").ForwardRefExoticComponent<import("react-native").ViewProps & import("react").RefAttributes<unknown>>;
export default Unredacted;
//# sourceMappingURL=Unredacted.d.ts.map