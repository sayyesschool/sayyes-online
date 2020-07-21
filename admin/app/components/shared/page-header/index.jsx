import React from 'react';
import {
    Button,
    Icon,
    Typography
} from 'mdc-react';

import './index.scss';

export default function PageHeader({ title, controls = [], children }) {
    return (
        <header className="page-header">
            <Typography className="page-title" element="h1" variant="headline4">{title}</Typography>

            {children}

            {controls.map(control =>
                <Button
                    key={control.key}
                    label={control.label}
                    icon={control.icon && <Icon>{control.icon}</Icon>}
                    onClick={control.onClick}
                />
            )}
        </header>
    );
}