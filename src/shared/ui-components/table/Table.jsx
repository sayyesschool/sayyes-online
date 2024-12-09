import { forwardRef } from 'react';

import JoyTable from '@mui/joy/Table';
import classnames from 'classnames';

import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';

const Table = forwardRef(({
    content,

    className,
    children = content,
    ...props
}, ref) => {
    const classNames = classnames('ui-Table', className);

    return (
        <JoyTable
            ref={ref}
            className={classNames}
            {...props}
        >
            {children}
        </JoyTable>
    );
});

Table.displayName = 'Table';

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Row = TableRow;

export default Table;