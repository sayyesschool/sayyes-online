import React from 'react';
import {
    Button,
    Layout,
    SideSheet
} from 'mdc-react';

import './index.scss';

export default function FormPanel({
    form,
    title,
    children,
    onDismiss,
    ...props
}) {
    return (
        <SideSheet
            className="form-panel"
            title={title}
            modal
            onClose={onDismiss}
            {...props}
        >
            {children}

            <Layout>
                <Button type="button" onClick={onDismiss}>Закрыть</Button>
                <Button type="submit" form={form} outlined>Сохранить</Button>
            </Layout>
        </SideSheet>
    );
}