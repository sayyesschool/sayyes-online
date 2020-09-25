import React from 'react';
import classnames from 'classnames';

export default function Page({ className, ...props }) {
    const classNames = classnames('page', className);

    return (
        <div className={classNames} {...props} />
    );
}