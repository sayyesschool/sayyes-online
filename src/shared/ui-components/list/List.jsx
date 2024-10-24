import { forwardRef } from 'react';

import JoyList from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import classnames from 'classnames';

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
List.Divider = ListDivider;

export default List;