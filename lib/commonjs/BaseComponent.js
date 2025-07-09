"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCobrowseHoC = createCobrowseHoC;
exports.useCobrowseRefs = useCobrowseRefs;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _mergeRefs = require("./mergeRefs");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function useCobrowseRefs(namespace, add, remove) {
  let shouldWarnUnhandledRefs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  let componentName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  const ref = (0, _react.useRef)(null);
  const setRef = (0, _react.useCallback)(node => {
    let hasRemovedRef = false;
    if (ref.current != null) {
      hasRemovedRef = true;
      remove(ref.current);
    }
    if (node != null) {
      // @ts-expect-error: findNodeHandle accepts any native component
      const view = (0, _reactNative.findNodeHandle)(node);
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
  (0, _react.useEffect)(() => {
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
function createCobrowseHoC(displayNamePrefix, useCobrowseRefs) {
  return function createCobrowseHoC(Component) {
    const displayName = Component.displayName;
    const Wrapped = /*#__PURE__*/(0, _react.forwardRef)(function ComponentFromHOC(props, ref) {
      const localRef = useCobrowseRefs(true, displayName);
      const refs = (0, _react.useMemo)(() => (0, _mergeRefs.mergeRefs)([localRef, ref]), [localRef, ref]);
      const componentProps = isViewComponent(Component) ? {
        ...props,
        collapsable: false
      } : props;
      return /*#__PURE__*/_react.default.createElement(Component, _extends({}, componentProps, {
        ref: refs
      }));
    });
    Wrapped.displayName = `${displayNamePrefix}(${displayName ?? 'Component'})`;
    return Wrapped;
  };
}
//# sourceMappingURL=BaseComponent.js.map