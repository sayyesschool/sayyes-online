import { forwardRef, useCallback } from 'react';
import classnames from 'classnames';

import ClickAwayListener from '@mui/base/ClickAwayListener';
import Popup from '@mui/base/PopperUnstyled';
import MenuList from '@mui/joy/MenuList';
import ListDivider from '@mui/joy/ListDivider';

import MenuItem from './MenuItem';

const Menu = forwardRef(({
    anchorElement,
    open,
    items,
    onItemClick = Function.prototype,
    onClose = Function.prototype,
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

    const classNames = classnames('ui-Menu');

    return (
        <Popup
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
                    ref={ref}
                    className={classNames}
                    variant="outlined"
                >
                    {items?.map(item =>
                        item.kind === 'divider' ?
                            <ListDivider key={item.key} />
                            :
                            <MenuItem
                                {...item}
                                onClicked={handleItemClicked}
                                onMenuClose={onClose}
                            />
                    )}
                </MenuList>
            </ClickAwayListener>
        </Popup>
    );
});

export default Menu;