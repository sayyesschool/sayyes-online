import React from 'react';
import classnames from 'classnames';
import {
    CircularProgress
} from 'mdc-react';

export default function Page({ loading, className, ...props }) {
    const classNames = classnames('page', className);

    return loading ? <CircularProgress indeterminate /> : (
        <div className={classNames} {...props} />
    );
}