import React from 'react';
import classnames from 'classnames';

export default function PageContent({ className, ...props }) {
    const classNames = classnames('page-content', className);

    return (
        <div className={classNames} {...props} />
    );
}