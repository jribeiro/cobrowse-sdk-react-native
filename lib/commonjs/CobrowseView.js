"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CobrowseIO = _interopRequireDefault(require("./CobrowseIO"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const styles = _reactNative.StyleSheet.create({
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
class CobrowseView extends _react.Component {
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
      _CobrowseIO.default.license = this.props.license;
    }
    try {
      const current = await _CobrowseIO.default.currentSession();
      if (current != null) this.setState({
        session: current
      });else {
        const session = await _CobrowseIO.default.createSession();
        this.setState({
          session
        });
      }
    } catch (error) {
      this.setState({
        error: error
      });
    }
    this._updateListener = _CobrowseIO.default.addListener('session.updated', session => {
      this.setState({
        session
      });
    });
    this._endListener = _CobrowseIO.default.addListener('session.ended', () => {
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.text]
    }, error.message);
  }
  renderCode() {
    var _this$state$session;
    let code = (_this$state$session = this.state.session) === null || _this$state$session === void 0 ? void 0 : _this$state$session.code;
    if (code != null) code = code.substr(0, 3) + '-' + code.substr(3);
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.code, {
        opacity: code != null ? 1 : 0.2
      }]
    }, code ?? '000-000'), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.text]
    }, "Provide this code to your support agent to begin screen sharing."), /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, null));
  }
  renderManageSession() {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.text]
    }, "You're sharing screens from this app with a support agent."), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: () => this.endSession
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.container
    }, this.renderContent());
  }
}
exports.default = CobrowseView;
//# sourceMappingURL=CobrowseView.js.map