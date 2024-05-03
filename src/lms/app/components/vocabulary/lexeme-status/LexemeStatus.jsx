import { useCallback, useState } from 'react';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import {
    Button,
    CircularProgress,
    Flex,
    Icon,
    Popover,
    Surface,
    Tooltip
} from 'shared/ui-components';

import styles from './LexemeStatus.module.scss';

export default function LexemeStatus({ level = 0, updateStatus }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const value = (level ?? 0) * 25;
    const percentageValue = `${value}%`;
    const isResetBtnDisabled = level === 0;
    const isSetLearnedBtnDisabled = level === 4;
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClickPopover = useCallback(
        event => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
        },
        [anchorEl]
    );

    const resetStatus = useCallback(() => {
        updateStatus(0).then(() => handleClickPopover());
    }, [handleClickPopover, updateStatus]);

    const setLearned = useCallback(() => {
        updateStatus(4).then(() => handleClickPopover());
    }, [handleClickPopover, updateStatus]);

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
                    onClick={handleClickPopover}
                >
                    <Icon className={styles.icon} color="warning">
            star
                    </Icon>
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
                <ClickAwayListener onClickAway={handleClickPopover}>
                    <Surface>
                        <Flex column>
                            <Button disabled={isResetBtnDisabled} onClick={resetStatus}>
                                Сбросить статус
                            </Button>

                            <Button disabled={isSetLearnedBtnDisabled} onClick={setLearned}>
                                Перевести в изученные
                            </Button>
                        </Flex>
                    </Surface>
                </ClickAwayListener>
            </Popover>
        </>
    );
}