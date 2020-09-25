import React from 'react';
import { Drawer } from 'mdc-react';
import classnames from 'classnames';

import './index.scss';

export default function PageDrawer({ className, children, ...props }) {
    const classNames = classnames('page-drawer', className);

    return (
        <Drawer
            className={classNames}
            open
            appear
            dismissible
            {...props}
        >
            <Drawer.Content>
                {children}
            </Drawer.Content>
        </Drawer>
    );
}