import {
    SideSheet
} from 'mdc-react';
import classnames from 'classnames';

import './index.scss';

SidePanel.Header = SidePanelHeader;
SidePanel.Content = SideSheet.Content;
SidePanel.Footer = SidePanelFooter;

export default function SidePanel({ className, ...props }) {
    return (
        <SideSheet
            className={classnames('side-panel', className)}
            {...props}
        />
    );
}

export function SidePanelHeader({ ...props }) {
    return (
        <header className="side-panel__header" {...props} />
    );
}

export function SidePanelFooter({ ...props }) {
    return (
        <footer className="side-panel__footer" {...props} />
    );
}