import { Component } from 'react';
import CobrowseIO from './CobrowseIO';
export default class SessionControl extends Component {
  _updateListener = null;
  constructor(props) {
    super(props);
    this.state = {
      session: null
    };
  }
  async componentDidMount() {
    this.setState({
      session: await CobrowseIO.currentSession()
    });
    this._updateListener = CobrowseIO.addListener(CobrowseIO.SESSION_UPDATED, session => {
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
//# sourceMappingURL=SessionControl.js.map