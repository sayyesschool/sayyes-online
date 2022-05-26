import { Box } from '@fluentui/react-northstar';
import classnames from 'classnames';

import './index.scss';

export default function SidePanel({ className, ...props }) {
    return (
        <Box
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