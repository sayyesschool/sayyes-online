import { cloneElement, forwardRef, isValidElement, useCallback, useState } from 'react';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Popper } from '@mui/base/Popper';
import MenuList from '@mui/joy/MenuList';
import classnames from 'classnames';

import { ListDivider } from '../list';

import MenuItem from './MenuItem';

import styles from './Menu.module.scss';

const defaultModifiers = [
    {
        name: 'offset',
        options: {
            offset: [0, 4]
        }
    }
];

const Menu = forwardRef(({
    open: _open = false,
    trigger,
    anchorElement: _anchorElement,
    items,
    disabled,
    onItemClick = Function.prototype,
    onClose = Function.prototype,

    className,
    ...props
}, ref) => {
    const [open, setOpen] = useState(_open);
    const [anchorElement, setAnchorElement] = useState(_anchorElement);

    const handleTriggerClick = useCallback(event => {
        if (disabled) return;

        setOpen(open => !open);
        setAnchorElement(event.currentTarget);
        trigger?.props?.onClick?.(event);
    }, [disabled, trigger]);

    const handleItemClicked = useCallback((event, { value, shouldClose }) => {
        onItemClick(event, { value });

        if (shouldClose) {
            onClose();
            setOpen(false);
        }
    }, [onClose, onItemClick]);

    const handleClickAway = useCallback(() => {
        setOpen(false);
        setAnchorElement(null);
        onClose();
    }, [onClose]);

    const classNames = classnames('ui-Menu', className);

    return (<>
        {isValidElement(trigger) &&
            cloneElement(trigger, {
                disabled,
                onClick: handleTriggerClick
            })
        }

        <Popper
            className={styles.popup}
            anchorEl={anchorElement}
            open={open}
            modifiers={defaultModifiers}
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
        </Popper>
    </>);
});

Menu.displayName = 'Menu';

export default Menu;