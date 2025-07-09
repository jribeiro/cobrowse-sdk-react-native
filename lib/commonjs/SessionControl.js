"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _CobrowseIO = _interopRequireDefault(require("./CobrowseIO"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SessionControl extends _react.Component {
  _updateListener = null;
  constructor(props) {
    super(props);
    this.state = {
      session: null
    };
  }
  async componentDidMount() {
    this.setState({
      session: await _CobrowseIO.default.currentSession()
    });
    this._updateListener = _CobrowseIO.default.addListener(_CobrowseIO.default.SESSION_UPDATED, session => {
      this.setState({
        session
      });
    });
  }
  componentWillUnmount() {
    if (this._updateListener != null) this._updateListener.remove();
  }
  render() {
    const {
      session
    } = this.state;
    if ((session === null || session === void 0 ? void 0 : session.isActive()) === true) return this.props.children;else return null;
  }
}
exports.default = SessionControl;
//# sourceMappingURL=SessionControl.js.map