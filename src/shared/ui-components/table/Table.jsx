import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyTable from '@mui/joy/Table';

import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHead from './TableHead';
import TableRow from './TableRow';

const Table = forwardRef(({
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

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Row = TableRow;

export default Table;