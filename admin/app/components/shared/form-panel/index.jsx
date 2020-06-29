import React from 'react';
import {
    DefaultButton,
    Panel, PanelType,
    PrimaryButton,
    Stack
} from '@fluentui/react';

export default function FormPanel({ title, form, children, onDismiss, ...props }) {
    return (
        <Panel
            headerText={title}
            type={PanelType.medium}
            closeButtonAriaLabel="Close"
            onDismiss={onDismiss}
            onRenderFooterContent={() =>
                <Stack horizontal tokens={{ childrenGap: 4 }}>
                    <DefaultButton type="button" onClick={onDismiss}>Закрыть</DefaultButton>
                    <PrimaryButton type="submit" form={form}>Сохранить</PrimaryButton>
                </Stack>
            }
            {...props}
        >
            {children}
        </Panel>
    );
}