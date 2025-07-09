function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useMemo, useRef, useCallback, useEffect } from 'react';
import { findNodeHandle } from 'react-native';
import { mergeRefs } from './mergeRefs';
export function useCobrowseRefs(namespace, add, remove) {
  let shouldWarnUnhandledRefs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  let componentName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  const ref = useRef(null);
  const setRef = useCallback(node => {
    let hasRemovedRef = false;
    if (ref.current != null) {
      hasRemovedRef = true;
      remove(ref.current);
    }
    if (node != null) {
      // @ts-expect-error: findNodeHandle accepts any native component
      const view = findNodeHandle(node);
      if (view != null) {
        add(view);
        ref.current = view;
      } else {
        console.warn(`Failed to apply ${namespace} to ${componentName} due to view not found`);
      }
    } else if (!hasRemovedRef) {
      console.warn(`Failed to apply ${namespace} to ${componentName} due to null node handle – make sure you are forwarding refs`);
    }
  }, [add, remove, namespace, componentName]);
  useEffect(() => {
    const currentView = ref.current;
    if (shouldWarnUnhandledRefs && currentView == null) {
      console.warn(`Failed to apply ${namespace} to ${componentName} due to null node handle – make sure the setRef function is called with the ref`);
    }
    return () => remove(currentView);
  }, [remove, namespace, componentName, shouldWarnUnhandledRefs]);
  return setRef;
}
function isViewComponent(Component) {
  return Component.displayName === 'View' || Component.name === 'View';
}
export function createCobrowseHoC(displayNamePrefix, useCobrowseRefs) {
  return function createCobrowseHoC(Component) {
    const displayName = Component.displayName;
    const Wrapped = /*#__PURE__*/forwardRef(function ComponentFromHOC(props, ref) {
      const localRef = useCobrowseRefs(true, displayName);
      const refs = useMemo(() => mergeRefs([localRef, ref]), [localRef, ref]);
      const componentProps = isViewComponent(Component) ? {
        ...props,
        collapsable: false
      } : props;
      return /*#__PURE__*/React.createElement(Component, _extends({}, componentProps, {
        ref: refs
      }));
    });
    Wrapped.displayName = `${displayNamePrefix}(${displayName ?? 'Component'})`;
    return Wrapped;
  };
}
//# sourceMappingURL=BaseComponent.js.map