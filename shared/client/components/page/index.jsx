import React, { forwardRef } from 'react';
import classnames from 'classnames';

export default forwardRef(Page);

function Page({ className, ...props }, ref) {
    const classNames = classnames('page', className);

    return (
        <main ref={ref} className={classNames} {...props} />
    );
}