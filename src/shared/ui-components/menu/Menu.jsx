import { forwardRef, useCallback } from 'react';
import classnames from 'classnames';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import MenuList from '@mui/joy/MenuList';

import { ListDivider } from '../list';
import Popover from '../popover';

import MenuItem from './MenuItem';

const Menu = forwardRef(({
    anchorElement,
    open,
    items,
    onItemClick = Function.prototype,
    onClose = Function.prototype,

    className,
    ...props
}, ref) => {
    const handleItemClicked = useCallback((event, { value, shouldClose }) => {
        onItemClick(event, { value });

        if (shouldClose) {
            onClose();
        }
    }, [onClose, onItemClick]);

    const handleClickAway = useCallback(() => {
        onClose();
    }, [onClose]);

    const classNames = classnames('ui-Menu', className);

    return (
        <Popover
            anchorEl={anchorElement}
            open={open}
            modifiers={[
                {
                    name: 'offset',
                    options: {
                        offset: [0, 4]
                    }
                }
            ]}
            {...props}
        >
            <ClickAwayListener onClickAway={handleClickAway}>
                <MenuList
                    key="menu-list"
                    ref={ref}
                    className={classNames}
                    variant="outlined"
                >
                    {items?.map(item =>
                        item.kind === 'divider' ?
                            <ListDivider key={item.key} />
                            :
                            <MenuItem
                                key={item.key}
                                {...item}
                                onClicked={handleItemClicked}
                                onMenuClose={onClose}
                            />
                    )}
                </MenuList>
            </ClickAwayListener>
        </Popover>
    );
});

Menu.displayName = 'Menu';

export default Menu;