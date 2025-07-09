"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.isRunning = isRunning;
exports.showSetup = showSetup;
var _reactNative = require("react-native");
const CobrowseIONative = _reactNative.NativeModules.CobrowseIO;
function showSetup() {
  return CobrowseIONative.accessibilityServiceShowSetup();
}
function isRunning() {
  return CobrowseIONative.accessibilityServiceIsRunning();
}
var _default = {
  showSetup,
  isRunning
};
exports.default = _default;
//# sourceMappingURL=CobrowseAccessibilityService.js.map