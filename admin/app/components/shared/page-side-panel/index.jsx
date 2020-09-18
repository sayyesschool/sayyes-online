import React from 'react';
import { SideSheet } from 'mdc-react';

import './index.scss';

export default function PageSidePanel({ children, ...props }) {
    return (
        <SideSheet className="page-side-panel" {...props}>
            {children}
        </SideSheet>
    );
}