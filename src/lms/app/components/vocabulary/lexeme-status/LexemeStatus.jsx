
import { useCallback, useState } from 'react';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import { Button, CircularProgress, Flex, Icon, Popover, Surface, Tooltip } from 'shared/ui-components';

import styles from './LexemeStatus.module.scss';

export default function LexemeStatus({ level = 0 }) {
    const [anchorEl, setAnchorEl] = useState(null);
    // const value = level * 25;
    const value = 25;
    const percentageValue = `${value}%`;

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClick = useCallback(event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }, [anchorEl]);

    return (
        <>
            <Tooltip content={percentageValue} placement="left">
                <CircularProgress
                    aria-describedby={id}
                    value={value}
                    sx={{
                        '--CircularProgress-size': '25px',
                        '--CircularProgress-trackThickness': '3px',
                        '--CircularProgress-trackColor': 'silver',
                        '--CircularProgress-progressThickness': '3px'
                    }}
                    className={styles.progress}
                    thickness={3}
                    determinate
                    onClick={handleClick}
                >
                    <Icon className={styles.icon} color="warning">star</Icon>
                </CircularProgress>

            </Tooltip>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                className={styles.popover}
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
                    <Surface>
                        <Flex column>
                            <Button variant="solid">Сбросить статус</Button>
                            <Button>Перевести в изученные</Button>
                        </Flex>
                    </Surface>
                </ClickAwayListener>
            </Popover>
        </>
    );
}