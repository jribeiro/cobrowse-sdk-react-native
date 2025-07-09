import { EmitterSubscription } from 'react-native';
export declare type SessionEvent = 'updated' | 'ended';
export declare type CobrowseSessionEvents = `session.${SessionEvent}`;
export declare type SessionState = 'active' | 'authorizing' | 'ended' | 'pending';
export declare type RemoteControlState = 'on' | 'requested' | 'rejected' | 'off';
export declare type FullDeviceState = 'on' | 'requested' | 'rejected' | 'off';
export interface Agent {
    id: string;
    name: string;
}
export interface SessionLike {
    id: string;
    code: string;
    state: SessionState;
    full_device: boolean;
    remote_control: RemoteControlState;
    agent: Agent;
    full_device_state: FullDeviceState;
}
export default class Session {
    private session;
    constructor(session?: SessionLike | Record<string, never>);
    private _update;
    _listen(): void;
    addListener(eventType: SessionEvent, listener: (session: Session) => void): EmitterSubscription;
    get id(): string | null;
    get code(): string | null;
    get state(): SessionState | null;
    get full_device(): boolean;
    get full_device_state(): FullDeviceState;
    get remote_control(): RemoteControlState | null;
    get agent(): Agent | null;
    activate(): Promise<void>;
    end(): Promise<void>;
    isActive(): boolean;
    isAuthorizing(): boolean;
    isPending(): boolean;
    isEnded(): boolean;
    setFullDevice(state: boolean | FullDeviceState): Promise<void>;
    setRemoteControl(state: RemoteControlState): Promise<void>;
    setCapabilities(capabilities: Array<'drawing' | 'full_device' | 'keypress' | 'laser' | 'pointer'>): Promise<void>;
}
//# sourceMappingURL=Session.d.ts.map