import { cloneElement, forwardRef, isValidElement, useCallback, useState } from 'react';

import Menu from '../menu';

const MenuButton = forwardRef(({
    trigger,
    items,
    disabled,
    onMenuClose = Function.prototype,
    onMenuItemClick,

    ...props
}, ref) => {
    const [open, setOpen] = useState(false);
    const [anchorElement, setAnchorElement] = useState(null);

    const handleTriggerClick = useCallback(event => {
        if (disabled) return;

        setOpen(open => !open);
        setAnchorElement(event.currentTarget);
    }, [disabled]);

    const handleClose = useCallback(() => {
        setOpen(false);
        setAnchorElement(null);
        onMenuClose();
    }, [onMenuClose]);

    return (
        <>
            {isValidElement(trigger) &&
                cloneElement(trigger, {
                    disabled,
                    onClick: handleTriggerClick
                })
            }

            <Menu
                ref={ref}
                anchorElement={anchorElement}
                open={open}
                items={items}
                onClose={handleClose}
                onItemClick={onMenuItemClick}
                {...props}
            />
        </>
    );
});

export default MenuButton;