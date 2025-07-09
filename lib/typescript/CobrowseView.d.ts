import { Component } from 'react';
import type Session from './Session';
interface CobrowseViewProps {
    license?: string;
    onEnded?: () => void;
}
interface CobrowseViewState {
    error: Error | null;
    session: Session | null;
}
export default class CobrowseView extends Component<CobrowseViewProps, CobrowseViewState> {
    private _updateListener;
    private _endListener;
    constructor(props: CobrowseViewProps);
    componentDidMount(): Promise<void>;
    componentWillUnmount(): void;
    endSession(): Promise<void>;
    renderError(error: Error): JSX.Element;
    renderCode(): JSX.Element;
    renderManageSession(): JSX.Element;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=CobrowseView.d.ts.map