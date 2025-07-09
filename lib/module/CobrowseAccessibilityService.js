import { NativeModules } from 'react-native';
const CobrowseIONative = NativeModules.CobrowseIO;
export function showSetup() {
  return CobrowseIONative.accessibilityServiceShowSetup();
}
export function isRunning() {
  return CobrowseIONative.accessibilityServiceIsRunning();
}
export default {
  showSetup,
  isRunning
};
//# sourceMappingURL=CobrowseAccessibilityService.js.map