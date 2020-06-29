import React from 'react';
import {
    CommandBar,
    Text
} from '@fluentui/react';

import './index.scss';

export default function PageHeader({ title, controls, children }) {
    return (
        <header className="page-header">
            <Text className="page-title" as="h1" variant="xLarge" block>{title}</Text>

            {children}

            {controls &&
                <CommandBar
                    items={controls}
                />
            }
        </header>
    );
}