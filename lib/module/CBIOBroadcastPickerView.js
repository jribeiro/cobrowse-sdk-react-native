import React from 'react';
import { Platform, requireNativeComponent } from 'react-native';
const CBIOBroadcastPickerViewNativeView = requireNativeComponent('CBIOBroadcastPickerView');
export default function CBIOBroadcastPickerView(props) {
  // this native component is only available on iOS
  return Platform.OS === 'ios' ? /*#__PURE__*/React.createElement(CBIOBroadcastPickerViewNativeView, props) : null;
}
//# sourceMappingURL=CBIOBroadcastPickerView.js.map