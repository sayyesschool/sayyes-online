import { cloneElement, useCallback, useState } from 'react';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Popper } from '@mui/base/Popper';

import { Surface } from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './Popover.module.scss';

export default function Popover({
    trigger,
    anchor: _anchor,
    surfaceProps,
    className,
    children,
    onClose,
    ...props
}) {
    const [anchor, setAnchor] = useState(_anchor);

    const handleTriggerClick = useCallback(event => {
        setAnchor(event.currentTarget);
        trigger.props?.onClick?.(event);
    }, [trigger]);

    const handleClickAway = useCallback(event => {
        setAnchor(null);
        onClose?.();
    }, [onClose]);

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;
    const classNames = cn(className, 'ui-Popover', styles.root);
    const modifiers = [
        {
            name: 'offset',
            options: {
                offset: [0, 10]
            }
        }
    ];

    return (<>
        {trigger && cloneElement(trigger, {
            'aria-describedby': id,
            onClick: handleTriggerClick
        })}

        <Popper
            id={id}
            className={classNames}
            open={open}
            anchorEl={anchor}
            modifiers={modifiers}
            {...props}
        >
            <ClickAwayListener onClickAway={handleClickAway}>
                <Surface className={styles.surface} {...surfaceProps}>
                    {children}
                </Surface>
            </ClickAwayListener>
        </Popper>
    </>);
}