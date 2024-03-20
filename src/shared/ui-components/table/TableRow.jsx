import { forwardRef } from 'react';
import classnames from 'classnames';

const TableRow = forwardRef(({
    header,
    content,

    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-TableRow', {
        'ui-TableRow--header': header
    }, className);

    return (
        <tr
            ref={ref}
            className={classNames}
            {...props}
        >
            {children}
        </tr>
    );
});

TableRow.displayName = 'TableRow';

export default TableRow;