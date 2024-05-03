import { useCallback } from 'react';

import {
    CircularProgress,
    Icon,
    IconButton,
    MenuButton,
    Tooltip
} from 'shared/ui-components';

import styles from './LexemeStatus.module.scss';

export default function LexemeStatus({
    level = 0,
    onChange
}) {
    const handleResetButtonClick = useCallback(() => {
        onChange(0);
    }, [onChange]);

    const handleLearningButtonClick = useCallback(() => {
        onChange(2);
    }, [onChange]);

    const handleLearnedButtonClick = useCallback(() => {
        onChange(4);
    }, [onChange]);

    const value = level * 25;
    const isResetButtonDisabled = level === 0;
    const isSetLearningButtonDisabled = level === 2;
    const isSetLearnedButtonDisabled = level === 4;

    return (
        <MenuButton
            trigger={
                <IconButton className={styles.icon}>
                    <Tooltip content={`${value}%`} placement="left">
                        <CircularProgress
                            className={styles.progress}
                            value={value}
                            thickness={3}
                            size="sm"
                            determinate
                        >
                            <Icon name="star" />
                        </CircularProgress>
                    </Tooltip>
                </IconButton>
            }
            items={[
                {
                    key: 'learning',
                    content: 'Перевести в изучаемые',
                    icon: 'school',
                    disabled: isSetLearningButtonDisabled,
                    onClick: handleLearningButtonClick
                },
                {
                    key: 'learned',
                    content: 'Перевести в изученные',
                    icon: 'done',
                    disabled: isSetLearnedButtonDisabled,
                    onClick: handleLearnedButtonClick
                },
                {
                    key: 'reset',
                    content: 'Сбросить статус',
                    icon: 'restart_alt',
                    color: 'danger',
                    disabled: isResetButtonDisabled,
                    onClick: handleResetButtonClick
                }
            ]}
        />
    );
}