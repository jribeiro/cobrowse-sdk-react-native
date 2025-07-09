import { EmitterSubscription } from 'react-native';
import Session, { type CobrowseSessionEvents } from './Session';
export default class CobrowseIO {
    private static sessionRequestShown;
    private static remoteControlRequestShown;
    /** @deprecated */
    static get SESSION_UPDATED(): 'session.updated';
    /** @deprecated */
    static get SESSION_ENDED(): 'session.ended';
    static handleSessionRequest(session: Session): void;
    static handleRemoteControlRequest(session: Session): void;
    static addListener(event: CobrowseSessionEvents | 'session.requested', cb: (session: Session) => void): EmitterSubscription;
    static start(): void;
    static stop(): void;
    static set api(api: string);
    static set license(license: string);
    static set customData(customData: Record<string, unknown>);
    static set capabilities(capabilities: Array<'drawing' | 'full_device' | 'keypress' | 'laser' | 'pointer'>);
    static set webviewRedactedViews(redactionSelectors: string[]);
    static set deviceToken(token: string);
    static currentSession(): Session | null;
    static createSession(): Session | null;
    static getSession(codeOrId: string): Session | null;
    /** @deprecated */
    static activateSession(): Session | null;
    /** @deprecated */
    static endSession(): void;
    static showSessionControls: Boolean | null;
    static handleFullDeviceRequest: null | ((s: Session) => void);
}
//# sourceMappingURL=CobrowseIO.d.ts.map