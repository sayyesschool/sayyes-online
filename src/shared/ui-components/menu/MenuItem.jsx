import { forwardRef, useCallback, useState } from 'react';

import JoyMenuItem from '@mui/joy/MenuItem';
import MenuList from '@mui/joy/MenuList';
import classnames from 'classnames';

import Icon from '../icon';
import { ListDivider, ListItemDecorator } from '../list';
import Popover from '../popover';

const MenuItem = forwardRef(({
    value,
    content,
    decorator,
    icon,
    items,
    color,
    onClick = Function.prototype,
    onClicked = Function.prototype,
    onItemClick = Function.prototype,
    onMenuClose = Function.prototype,

    as,
    className,
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

    const classNames = classnames('ui-MenuItem', className);

    return (
        <JoyMenuItem
            ref={ref}
            component={as}
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

            {icon &&
                <ListItemDecorator key="decorator" sx={color ? { color: 'inherit' } : undefined}>
                    <Icon name={icon} />
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
                                    key={item.key}
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

MenuItem.displayName = 'MenuItem';

export default MenuItem;