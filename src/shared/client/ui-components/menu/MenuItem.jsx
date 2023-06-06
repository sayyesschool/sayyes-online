import { forwardRef, useCallback, useState } from 'react';
import classnames from 'classnames';

import Popup from '@mui/base/Popper';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import JoyMenuItem from '@mui/joy/MenuItem';
import MenuList from '@mui/joy/MenuList';

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
                <Popup
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
                </Popup>
            }
        </JoyMenuItem>
    );
});

export default MenuItem;