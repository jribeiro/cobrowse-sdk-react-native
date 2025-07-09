"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _Session = _interopRequireDefault(require("./Session"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CobrowseIONative = _reactNative.NativeModules.CobrowseIO;
const emitter = new _reactNative.NativeEventEmitter(CobrowseIONative);

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class CobrowseIO {
  static sessionRequestShown = false;
  static remoteControlRequestShown = false;

  /** @deprecated */
  static get SESSION_UPDATED() {
    return 'session.updated';
  }

  /** @deprecated */
  static get SESSION_ENDED() {
    return 'session.ended';
  }
  static handleSessionRequest(session) {
    if (this.sessionRequestShown) return;
    this.sessionRequestShown = true;
    _reactNative.Alert.alert('Support Request', 'A support agent would like to use this app with you. Do you accept?', [{
      text: 'Reject',
      onPress: () => {
        this.sessionRequestShown = false;
        void session.end();
      },
      style: 'cancel'
    }, {
      text: 'Accept',
      onPress: () => {
        this.sessionRequestShown = false;
        void session.activate();
      }
    }], {
      cancelable: false
    });
  }
  static handleRemoteControlRequest(session) {
    if (this.remoteControlRequestShown) return;
    this.remoteControlRequestShown = true;
    _reactNative.Alert.alert('Remote Control Request', 'A support agent would like to take remote control of this app. Do you accept?', [{
      text: 'Reject',
      onPress: () => {
        this.remoteControlRequestShown = false;
        void session.setRemoteControl('rejected');
      },
      style: 'cancel'
    }, {
      text: 'Accept',
      onPress: () => {
        this.remoteControlRequestShown = false;
        void session.setRemoteControl('on');
      }
    }], {
      cancelable: false
    });
  }
  static addListener(event, cb) {
    return emitter.addListener(event, session => cb(new _Session.default(session)));
  }
  static start() {
    CobrowseIONative.start();
  }
  static stop() {
    CobrowseIONative.stop();
  }

  // eslint-disable-next-line accessor-pairs
  static set api(api) {
    CobrowseIONative.api(api);
  }

  // eslint-disable-next-line accessor-pairs
  static set license(license) {
    CobrowseIONative.license(license);
  }

  // eslint-disable-next-line accessor-pairs
  static set customData(customData) {
    CobrowseIONative.customData(customData);
  }

  // eslint-disable-next-line accessor-pairs
  static set capabilities(capabilities) {
    CobrowseIONative.capabilities(capabilities);
  }

  // eslint-disable-next-line accessor-pairs
  static set webviewRedactedViews(redactionSelectors) {
    CobrowseIONative.webviewRedactedViews(redactionSelectors);
  }

  // eslint-disable-next-line accessor-pairs
  static set deviceToken(token) {
    CobrowseIONative.deviceToken(token);
  }
  static currentSession() {
    return CobrowseIONative.currentSession().then(session => session != null ? new _Session.default(session) : null);
  }
  static createSession() {
    return CobrowseIONative.createSession().then(session => session != null ? new _Session.default(session) : null);
  }
  static getSession(codeOrId) {
    return CobrowseIONative.getSession(codeOrId).then(session => session != null ? new _Session.default(session) : null);
  }

  /** @deprecated */
  static activateSession() {
    return CobrowseIONative.activateSession().then(session => session != null ? new _Session.default(session) : null);
  }

  /** @deprecated */
  static endSession() {
    return CobrowseIONative.endSession();
  }
  static showSessionControls = null;
  static handleFullDeviceRequest = null;
}

// the session.requested event is considered internal, it should
// not be used outside these bindings
exports.default = CobrowseIO;
CobrowseIO.addListener('session.requested', session => {
  if (CobrowseIO.showSessionControls === false) {
    CobrowseIONative.overwriteSessionIndicator();
  }
  if (_reactNative.Platform.OS === 'ios' && CobrowseIO.handleFullDeviceRequest != null) {
    CobrowseIONative.overwriteFullControlUI();
  }
  CobrowseIO.handleSessionRequest(session);
});
CobrowseIO.addListener('session.updated', session => {
  if (session.isActive() && session.remote_control === 'requested') {
    CobrowseIO.handleRemoteControlRequest(session);
  }
  if (session.isActive() && session.full_device_state === 'requested') {
    if (CobrowseIO.handleFullDeviceRequest != null) {
      CobrowseIO.handleFullDeviceRequest(session);
    } else if (_reactNative.Platform.OS === 'android') {
      // accept the incoming connection by default
      void session.setFullDevice('on');
    }
  }
});
//# sourceMappingURL=CobrowseIO.js.map