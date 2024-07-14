import { useCallback } from 'react';

import { IconButton, Menu, ProgressStatus } from 'shared/ui-components';

export default function LexemeStatus({
    level = 0,
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

    return (
        <Menu
            trigger={
                <IconButton>
                    <ProgressStatus level={level} />
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