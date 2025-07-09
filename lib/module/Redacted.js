import { View, NativeModules } from 'react-native';
import { throttle } from 'lodash';
import { createCobrowseHoC, useCobrowseRefs } from './BaseComponent';
const {
  CobrowseIO: CobrowseIONative
} = NativeModules;
const namespace = 'Redact';
const redactedTags = new Set();
const sendRedactionUpdates = throttle(() => {
  CobrowseIONative.setRedactedTags([...redactedTags]);
}, 50);
function remove(tag) {
  if (tag != null) {
    redactedTags.delete(tag);
    sendRedactionUpdates();
  }
}
function add(tag) {
  if (tag != null) {
    redactedTags.add(tag);
    sendRedactionUpdates();
  }
}
export function useRedaction() {
  let shouldWarnUnhandledRefs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  let componentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return useCobrowseRefs(namespace, add, remove, shouldWarnUnhandledRefs, componentName);
}
export function redact(Component) {
  return createCobrowseHoC(namespace, useRedaction)(Component);
}
const Redacted = redact(View);
export default Redacted;
//# sourceMappingURL=Redacted.js.map