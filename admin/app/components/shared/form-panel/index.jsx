import React from 'react';
import {
    SideSheet
} from 'mdc-react';

import './index.scss';

export default function FormPanel({
    children,
    ...props
}) {
    return (
        <SideSheet
            className="form-panel"
            modal
            {...props}
        >
            <SideSheet.Content>
                {children}
            </SideSheet.Content>
        </SideSheet>
    );
}