import { forwardRef } from 'react';
import classnames from 'classnames';

import JoyList from '@mui/joy/List';

import ListItem from './ListItem';

const List = forwardRef(({
    items,
    interactive,

    className,
    children,
    ...props
}, ref) => {
    const classNames = classnames('ui-List', className);

    return (
        <JoyList
            ref={ref}
            className={classNames}
            {...props}
        >
            {items?.map(item =>
                <ListItem
                    key={item.key}
                    interactive={interactive}
                    {...item}
                />
            )}

            {children}
        </JoyList>
    );
});

List.displayName = 'List';

List.Item = ListItem;

export default List;