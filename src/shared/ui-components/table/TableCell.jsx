import { forwardRef } from 'react';

import classnames from 'classnames';

const TableCell = forwardRef(({
    header,
    content,
    align,

    as: Tag = header ? 'th' : 'td',
    children = content,
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-TableCell', {
        'ui-TableCell--header': header,
        [`ui-TableCell--align-${align}`]: align
    }, className);

    return (
        <Tag
            ref={ref}
            className={classNames}
            {...props}
        >
            {children}
        </Tag>
    );
});

TableCell.displayName = 'TableCell';

export default TableCell;