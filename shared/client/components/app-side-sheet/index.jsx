import React from 'react';
import { SideSheet } from 'mdc-react';
import classnames from 'classnames';

import './index.scss';

export default function AppSideSheet({ className, children, ...props }) {
    const classNames = classnames('app-side-sheet', className);

    return (
        <SideSheet
            className={classNames}
            dismissible
            {...props}
        >
            <SideSheet.Content>
                {children}
            </SideSheet.Content>
        </SideSheet>
    );
}