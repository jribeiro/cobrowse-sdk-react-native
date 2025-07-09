"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.unredact = unredact;
exports.useUnredaction = useUnredaction;
var _reactNative = require("react-native");
var _lodash = require("lodash");
var _BaseComponent = require("./BaseComponent");
const CobrowseIONative = _reactNative.NativeModules.CobrowseIO;
const namespace = 'Unredact';
const unredactedTags = new Set();
const sendUnredactionUpdates = (0, _lodash.throttle)(() => {
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
function useUnredaction() {
  let shouldWarnUnhandledRefs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  let componentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (0, _BaseComponent.useCobrowseRefs)(namespace, add, remove, shouldWarnUnhandledRefs, componentName);
}
function unredact(Component) {
  return (0, _BaseComponent.createCobrowseHoC)(namespace, useUnredaction)(Component);
}
const Unredacted = unredact(_reactNative.View);
var _default = Unredacted;
exports.default = _default;
//# sourceMappingURL=Unredacted.js.map