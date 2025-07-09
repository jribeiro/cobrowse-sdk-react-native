import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import CobrowseIO from './CobrowseIO';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  text: {
    textAlign: 'center',
    margin: 15,
    fontSize: 15,
    lineHeight: 20
  },
  code: {
    fontSize: 29,
    padding: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    color: 'rgb(0, 122, 255)',
    fontSize: 18,
    margin: 10
  }
});
export default class CobrowseView extends Component {
  _updateListener = null;
  _endListener = null;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      session: null
    };
  }
  async componentDidMount() {
    if (this.props.license != null) {
      console.warn('Passing license to view is deprecated. Use CobrowseIO.license = "..." instead');
      CobrowseIO.license = this.props.license;
    }
    try {
      const current = await CobrowseIO.currentSession();
      if (current != null) this.setState({
        session: current
      });else {
        const session = await CobrowseIO.createSession();
        this.setState({
          session
        });
      }
    } catch (error) {
      this.setState({
        error: error
      });
    }
    this._updateListener = CobrowseIO.addListener('session.updated', session => {
      this.setState({
        session
      });
    });
    this._endListener = CobrowseIO.addListener('session.ended', () => {
      if (this.props.onEnded != null) this.props.onEnded();
      this.setState({
        session: null
      });
    });
  }
  componentWillUnmount() {
    if (this._updateListener != null) this._updateListener.remove();
    if (this._endListener != null) this._endListener.remove();
  }
  async endSession() {
    try {
      const {
        session
      } = this.state;
      if (session == null) {
        throw new Error('No session to end');
      }
      await session.end();
      this.setState({
        session: null
      });
    } catch (error) {
      this.setState({
        error: error
      });
    }
  }
  renderError(error) {
    return /*#__PURE__*/React.createElement(Text, {
      style: [styles.text]
    }, error.message);
  }
  renderCode() {
    var _this$state$session;
    let code = (_this$state$session = this.state.session) === null || _this$state$session === void 0 ? void 0 : _this$state$session.code;
    if (code != null) code = code.substr(0, 3) + '-' + code.substr(3);
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
      style: [styles.code, {
        opacity: code != null ? 1 : 0.2
      }]
    }, code ?? '000-000'), /*#__PURE__*/React.createElement(Text, {
      style: [styles.text]
    }, "Provide this code to your support agent to begin screen sharing."), /*#__PURE__*/React.createElement(ActivityIndicator, null));
  }
  renderManageSession() {
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
      style: [styles.text]
    }, "You're sharing screens from this app with a support agent."), /*#__PURE__*/React.createElement(TouchableOpacity, {
      onPress: () => this.endSession
    }, /*#__PURE__*/React.createElement(Text, {
      style: [styles.text, styles.button]
    }, "End Session")));
  }
  renderContent() {
    const {
      error,
      session
    } = this.state;
    if (error != null) {
      return this.renderError(error);
    } else if (session == null || session.state === 'pending' || session.state === 'authorizing') {
      return this.renderCode();
    } else {
      return this.renderManageSession();
    }
  }
  render() {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.container
    }, this.renderContent());
  }
}
//# sourceMappingURL=CobrowseView.js.map