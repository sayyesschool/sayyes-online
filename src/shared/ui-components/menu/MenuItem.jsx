import { forwardRef, useCallback, useState } from 'react';
import classnames from 'classnames';

import JoyMenuItem from '@mui/joy/MenuItem';
import MenuList from '@mui/joy/MenuList';

import { ListDivider, ListItemDecorator } from '../list';
import Popover from '../popover';

const MenuItem = forwardRef(({
    value,
    content,
    decorator,
    items,
    color,
    onClick = Function.prototype,
    onClicked = Function.prototype,
    onItemClick = Function.prototype,
    onMenuClose = Function.prototype,

    as,
    children = content,
    ...props
}, ref) => {
    const [anchorElement, setAnchorElement] = useState();

    const [open, setOpen] = useState(false);

    const handleClick = useCallback(event => {
        onClick(event, { value });

        onClicked(event, {
            value,
            shouldClose: !items
        });

        if (items) {
            setAnchorElement(event.currentTarget);
            setOpen(true);
        }
    }, [value, items, onClick, onClicked]);

    const handleSubItemClicked = useCallback((event, { value }) => {
        onItemClick(event, { value });
        onMenuClose();
    }, [onItemClick, onMenuClose]);

    const classNames = classnames('ui-MenuItem');

    return (
        <JoyMenuItem
            component={as}
            ref={ref}
            className={classNames}
            color={color}
            onClick={handleClick}
            {...props}
        >
            {decorator &&
                <ListItemDecorator key="decorator" sx={color ? { color: 'inherit' } : undefined}>
                    {decorator}
                </ListItemDecorator>
            }

            {children}

            {items &&
                <Popover
                    key="popup"
                    open={open}
                    anchorEl={anchorElement}
                    placement="right-start"
                    modifiers={[
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 4]
                            }
                        }
                    ]}
                >
                    <MenuList>
                        {items?.map(item =>
                            item.kind === 'divider' ?
                                <ListDivider key={item.key} />
                                :
                                <MenuItem
                                    {...item}
                                    onClick={handleClick}
                                    onClicked={handleSubItemClicked}
                                />
                        )}
                    </MenuList>
                </Popover>
            }
        </JoyMenuItem>
    );
});

export default MenuItem;