"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CBIOBroadcastPickerView;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CBIOBroadcastPickerViewNativeView = (0, _reactNative.requireNativeComponent)('CBIOBroadcastPickerView');
function CBIOBroadcastPickerView(props) {
  // this native component is only available on iOS
  return _reactNative.Platform.OS === 'ios' ? /*#__PURE__*/_react.default.createElement(CBIOBroadcastPickerViewNativeView, props) : null;
}
//# sourceMappingURL=CBIOBroadcastPickerView.js.map