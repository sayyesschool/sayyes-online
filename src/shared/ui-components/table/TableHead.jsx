import { forwardRef } from 'react';
import classnames from 'classnames';

const TableHead = forwardRef(({
    content,
    
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

TableHead.displayName = 'TableHead';

export default TableHead;