import { useCallback } from 'react';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import { Button, Popover, Surface } from 'shared/ui-components';

import styles from './PopoverBtn.module.scss';

export default function PopoverBtn({
    anchorEl,
    setAnchorEl,
    onSubmit,
    children,
    ...props
}) {
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClick = useCallback(event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }, [anchorEl, setAnchorEl]);

    return (
        <div {...props}>
            <Button
                content="Добавить словарь"
                icon="add_circle"
                variant="solid"
                aria-describedby={id}
                onClick={handleClick}
            />

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 10]
                        }
                    }
                ]}
            >
                <ClickAwayListener onClickAway={handleClick}>
                    <Surface className={styles.sheet}>
                        {children}
                    </Surface>
                </ClickAwayListener>
            </Popover>
        </div>
    );
}