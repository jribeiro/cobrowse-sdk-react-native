import React, { Component } from 'react';
import type Session from './Session';
interface SessionControlProps {
    children: React.ReactNode;
}
interface SessionControlState {
    session: Session | null;
}
export default class SessionControl extends Component<SessionControlProps, SessionControlState> {
    private _updateListener;
    constructor(props: SessionControlProps);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    render(): React.ReactNode | null;
}
export {};
//# sourceMappingURL=SessionControl.d.ts.map