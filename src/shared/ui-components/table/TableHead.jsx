import { forwardRef } from 'react';
import classnames from 'classnames';

const TableHead = forwardRef(({
    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-TableHead', className);

    return (
        <thead
            ref={ref}
            className={classNames}
            {...props}
        >
            {children}
        </thead>
    );
});

export default TableHead;