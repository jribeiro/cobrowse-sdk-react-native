import React from 'react'
import { Alert, requireNativeComponent, View, Text, AppRegistry } from 'react-native'
import Session from './Session'
const CobrowseIONative = require('react-native').NativeModules.CobrowseIO
const NativeEventEmitter = require('react-native').NativeEventEmitter

const emitter = new NativeEventEmitter(CobrowseIONative)

export default class CobrowseIO {
  /** @deprecated */
  static get SESSION_UPDATED () {
    return 'session.updated'
  }

  /** @deprecated */
  static get SESSION_ENDED () {
    return 'session.ended'
  }

  static handleSessionRequest (session) {
    if (this._sessionRequestShown) return
    this._sessionRequestShown = true
    Alert.alert(
      'Support Request',
      'A support agent would like to use this app with you. Do you accept?',
      [{
        text: 'Reject',
        onPress: () => {
          this._sessionRequestShown = false
          session.end()
        },
        style: 'cancel'
      }, {
        text: 'Accept',
        onPress: () => {
          this._sessionRequestShown = false
          session.activate()
        }
      }], { cancelable: false })
  }

  static handleRemoteControlRequest (session) {
    if (this._remoteControlRequestShown) return
    this._remoteControlRequestShown = true
    Alert.alert(
      'Remote Control Request',
      'A support agent would like to take remote control of this app. Do you accept?',
      [{
        text: 'Reject',
        onPress: () => {
          this._remoteControlRequestShown = false
          session.setRemoteControl('rejected')
        },
        style: 'cancel'
      }, {
        text: 'Accept',
        onPress: () => {
          this._remoteControlRequestShown = false
          session.setRemoteControl('on')
        }
      }], { cancelable: false })
  }

  static addListener (event, cb) {
    return emitter.addListener(event, (session) => cb(new Session(session)))
  }

  static start () {
    return CobrowseIONative.start()
  }

  static stop () {
    return CobrowseIONative.stop()
  }

  static set api (api) {
    CobrowseIONative.api(api)
  }

  static set license (license) {
    CobrowseIONative.license(license)
  }

  static set customData (customData) {
    CobrowseIONative.customData(customData)
  }

  static set deviceToken (token) {
    CobrowseIONative.deviceToken(token)
  }

  static currentSession () {
    return CobrowseIONative.currentSession().then((session) => session ? new Session(session) : null)
  }

  static createSession () {
    return CobrowseIONative.createSession().then((session) => session ? new Session(session) : null)
  }

  static getSession (codeOrId) {
    return CobrowseIONative.getSession(codeOrId).then((session) => session ? new Session(session) : null)
  }

  /** @deprecated */
  static activateSession () {
    return CobrowseIONative.activateSession().then((session) => session ? new Session(session) : null)
  }

  /** @deprecated */
  static endSession () {
    return CobrowseIONative.endSession()
  }
}

// the session.requested event is considered internal, it should
// not be used outside these bindings
CobrowseIO.addListener('session.requested', (session) => {
  CobrowseIO.handleSessionRequest(session)
})

// CobrowseIO.addListener('session.updated', (session) => {
//   if (session.isActive() && session.remote_control === 'requested') {
//     CobrowseIO.handleRemoteControlRequest(session)
//   }
// })

CobrowseIO.addListener('session.updated', (session) => {
  if (CobrowseIO.handleFullDeviceRequest) {
    console.log("🚀 ~ file: CobrowseIO.js ~ line 129 ~ CobrowseIO.addListener ~ CobrowseIO.handleFullDeviceRequest", CobrowseIO.handleFullDeviceRequest)
    CobrowseIONative.overwriteFullControlUI()
    console.log("🚀 ~ file: CobrowseIO.js ~ line 131 ~ CobrowseIO.addListener ~ CobrowseIONative.overwriteFullControlUI", CobrowseIONative.overwriteFullControlUI)
  }
  console.log("🚀 ~ file: CobrowseIO.js ~ line 131 ~ CobrowseIO.addListener ~ session", session.full_device, JSON.stringify(session))
  if (session.isActive() && session.remote_control === 'requested') {
    console.info('remote control requested')
    CobrowseIO.handleRemoteControlRequest(session)
  } else if (session.full_device_state === 'requested' && CobrowseIO.handleFullDeviceRequest) {
    // console.info('rendering full device')
    // load the full device prompt
    CobrowseIO.handleFullDeviceRequest(session)
  }


})

// function ChildrenWrapper(props) {
//   return <>{props.children}</>;
// }

// AppRegistry.setWrapperComponentProvider((props) => <ChildrenWrapper {...props} />);