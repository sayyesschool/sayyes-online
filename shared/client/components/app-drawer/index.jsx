import React from 'react';
import {
    Drawer
} from 'mdc-react';

import './index.scss';

export default function AppDrawer({ open, children }) {
    return (
        <Drawer id="app-drawer" dismissible open={open} appear>
            <Drawer.Content>
                {children}
            </Drawer.Content>
        </Drawer>
    );
}