"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSession = useSession;
var _react = require("react");
var _CobrowseIO = _interopRequireDefault(require("./CobrowseIO"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useSession() {
  const [session, setSession] = (0, _react.useState)(null);

  // initial value
  (0, _react.useEffect)(() => {
    let isMounted = true;
    async function getSession() {
      const session = await _CobrowseIO.default.currentSession();
      if (isMounted) {
        setSession(session);
      }
    }
    void getSession();
    return () => {
      isMounted = false;
    };
  }, []);

  // listen to session updates
  (0, _react.useEffect)(() => {
    const subscription = _CobrowseIO.default.addListener(_CobrowseIO.default.SESSION_UPDATED, setSession);
    return () => subscription.remove();
  }, []);
  return session;
}
//# sourceMappingURL=useSession.js.map