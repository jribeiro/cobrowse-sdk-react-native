"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.redact = redact;
exports.useRedaction = useRedaction;
var _reactNative = require("react-native");
var _lodash = require("lodash");
var _BaseComponent = require("./BaseComponent");
const {
  CobrowseIO: CobrowseIONative
} = _reactNative.NativeModules;
const namespace = 'Redact';
const redactedTags = new Set();
const sendRedactionUpdates = (0, _lodash.throttle)(() => {
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
function useRedaction() {
  let shouldWarnUnhandledRefs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  let componentName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (0, _BaseComponent.useCobrowseRefs)(namespace, add, remove, shouldWarnUnhandledRefs, componentName);
}
function redact(Component) {
  return (0, _BaseComponent.createCobrowseHoC)(namespace, useRedaction)(Component);
}
const Redacted = redact(_reactNative.View);
var _default = Redacted;
exports.default = _default;
//# sourceMappingURL=Redacted.js.map