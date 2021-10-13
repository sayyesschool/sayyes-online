import React from 'react';
import {
    Drawer
} from 'mdc-react';

import './index.scss';

export default function AppDrawer({ open, children, ...props }) {
    return (
        <Drawer
            className="app-drawer"
            open={open}
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