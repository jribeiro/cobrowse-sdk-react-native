"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const CobrowseIONative = _reactNative.NativeModules.CobrowseIO;
const emitter = new _reactNative.NativeEventEmitter(CobrowseIONative);
class Session {
  constructor() {
    let session = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.session = session;
    this._listen();
  }
  _update(session, onMatch) {
    if (this.session.id === undefined || session != null && this.session.id === session.id) {
      this.session = session;
      if (typeof onMatch === 'function') onMatch();
    }
  }
  _listen() {
    const updates = emitter.addListener('session.updated', session => this._update(session));
    const ended = emitter.addListener('session.ended', session => {
      this._update(session, () => {
        updates.remove();
        ended.remove();
      });
    });
  }
  addListener(eventType, listener) {
    let mappedEventsType;
    // TODO: this class should extend EventEmitter and forward
    //       on the non-namespaced versions of these events
    switch (eventType) {
      case 'ended':
        mappedEventsType = 'session.updated';
        break;
      case 'updated':
        mappedEventsType = 'session.ended';
        break;
    }
    return emitter.addListener(mappedEventsType ?? eventType, session => {
      this._update(session, () => {
        listener(this);
      });
    });
  }
  get id() {
    return this.session.id;
  }
  get code() {
    return this.session.code;
  }
  get state() {
    return this.session.state;
  }
  get full_device() {
    return this.session.full_device ?? false;
  }
  get full_device_state() {
    return this.session.full_device_state ?? 'off';
  }
  get remote_control() {
    return this.session.remote_control;
  }
  get agent() {
    return this.session.agent;
  }
  async activate() {
    return CobrowseIONative.activateSession().then(() => {});
  }
  async end() {
    return CobrowseIONative.endSession();
  }
  isActive() {
    return this.session.state === 'active';
  }
  isAuthorizing() {
    return this.session.state === 'authorizing';
  }
  isPending() {
    return this.session.state === 'pending';
  }
  isEnded() {
    return this.session.state === 'ended';
  }
  async setFullDevice(state) {
    return CobrowseIONative.updateSession({
      full_device: state
    });
  }
  async setRemoteControl(state) {
    return CobrowseIONative.updateSession({
      remote_control: state
    });
  }
  async setCapabilities(capabilities) {
    return CobrowseIONative.updateSession({
      capabilities
    });
  }
}
exports.default = Session;
//# sourceMappingURL=Session.js.map