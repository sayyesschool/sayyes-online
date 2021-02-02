import React, { forwardRef } from 'react';
import classnames from 'classnames';

import LoadingIndicator from 'shared/components/loading-indicator';

export default forwardRef(Page);

function Page({ loading, className, ...props }, ref) {
    const classNames = classnames('page', className);

    return loading ?
        <LoadingIndicator indeterminate />
        :
        <main ref={ref} className={classNames} {...props} />;
}