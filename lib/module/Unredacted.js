import { View, NativeModules } from 'react-native';
import { throttle } from 'lodash';
import { createCobrowseHoC, useCobrowseRefs } from './BaseComponent';
const CobrowseIONative = NativeModules.CobrowseIO;
const namespace = 'Unredact';
const unredactedTags = new Set();
const sendUnredactionUpdates = throttle(() => {
  CobrowseIONative.setUnredactedTags([...unredactedTags]);
}, 50, {
  leading: false
});
function remove(view) {
  if (view != null) {
    unredactedTags.delete(view);
    sendUnredactionUpdates();
  }
}
function add(view) {
  if (view != null) {
    unredactedTags.add(view);
    sendUnredactionUpdates();
  }
}
export function useUnredaction() {
  let shouldWarnUnhandledRefs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  let componentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return useCobrowseRefs(namespace, add, remove, shouldWarnUnhandledRefs, componentName);
}
export function unredact(Component) {
  return createCobrowseHoC(namespace, useUnredaction)(Component);
}
const Unredacted = unredact(View);
export default Unredacted;
//# sourceMappingURL=Unredacted.js.map