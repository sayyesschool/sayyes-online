import { useCallback } from 'react';

import { CircularProgress, Icon, IconButton, Menu, Tooltip } from 'shared/ui-components';

const StatusIcon = {
    0: 'kid_star',
    1: 'school',
    2: 'school',
    3: 'school',
    4: 'school',
    5: 'done'
};

const StatusColor = {
    0: 'neutral',
    1: 'warning',
    2: 'warning',
    3: 'warning',
    4: 'warning',
    5: 'success'
};

export default function LexemeStatus({
    level = 0,
    tooltipPlacement,
    readOnly,
    onChange
}) {
    const handleResetButtonClick = useCallback(() => {
        onChange(0);
    }, [onChange]);

    const handleLearningButtonClick = useCallback(() => {
        onChange(3);
    }, [onChange]);

    const handleLearnedButtonClick = useCallback(() => {
        onChange(5);
    }, [onChange]);

    const isResetButtonDisabled = level === 0;
    const isSetLearningButtonDisabled = level === 2;
    const isSetLearnedButtonDisabled = level === 4;

    const value = level * 20;
    const color = StatusColor[level];
    const icon = StatusIcon[level];

    const content = (
        <Tooltip content={`${value}%`} placement={tooltipPlacement}>
            <CircularProgress
                value={value}
                thickness={3}
                color={color}
                size="sm"
                determinate
            >
                <Icon name={icon} />
            </CircularProgress>
        </Tooltip>
    );

    return readOnly ? content : (
        <Menu
            trigger={<IconButton>{content}</IconButton>}
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
            disabled={readOnly}
        />
    );
}