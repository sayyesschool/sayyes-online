import { cloneElement, forwardRef, isValidElement, useCallback, useRef, useState } from 'react';

import Menu from '../menu/Menu';

const MenuButton = forwardRef(({
    trigger,
    items,
    onMenuClose = Function.prototype,
    onMenuItemClick,

    ...props
}, ref) => {
    const triggerRef = useRef();

    const [open, setOpen] = useState(false);

    const handleTriggerClick = useCallback(() => {
        setOpen(open => !open);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
        onMenuClose();
    }, [onMenuClose]);

    return (
        <>
            {isValidElement(trigger) &&
                cloneElement(trigger, {
                    ref: triggerRef,
                    onClick: handleTriggerClick
                })
            }

            <Menu
                ref={ref}
                anchorElement={triggerRef.current}
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