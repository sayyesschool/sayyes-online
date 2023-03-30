import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyList from '@mui/joy/List';

import ListItem from './ListItem';

const List = forwardRef(({
    className,
    ...props
}, ref) => {
    const classNames = classnames('ui-List', className);

    return (
        <JoyList
            ref={ref}
            className={classNames}
            {...props}
        />
    );
});

List.Item = ListItem;

export default List;