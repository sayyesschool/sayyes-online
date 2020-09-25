import React from 'react';
import classnames from 'classnames';

import { Typography } from 'mdc-react';

export default function EmptyState({ title, className, ...props }) {
    const classNames = classnames('empty-state', className);

    return (
        <div className={classNames} {...props}>
            <Typography>{title}</Typography>
        </div>
    );
}