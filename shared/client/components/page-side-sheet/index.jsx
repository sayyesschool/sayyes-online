import React from 'react';
import { SideSheet } from 'mdc-react';
import classnames from 'classnames';

import './index.scss';

export default function PageSideSheet({ className, children, ...props }) {
    const classNames = classnames('page-side-sheet', className);

    return (
        <SideSheet
            className={classNames}
            open
            appear
            dismissible
            {...props}
        >
            <SideSheet.Content>
                {children}
            </SideSheet.Content>
        </SideSheet>
    );
}