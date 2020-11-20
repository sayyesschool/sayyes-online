import React from 'react';
import {
    Button,
    SideSheet
} from 'mdc-react';

import './index.scss';

export default function FormPanel({
    form,
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

            <footer className="form-panel__actions">
                <Button type="submit" form={form} outlined>Сохранить</Button>
            </footer>
        </SideSheet>
    );
}