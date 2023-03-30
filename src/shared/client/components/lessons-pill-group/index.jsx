import { useCallback } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import { useBoolean } from 'shared/hooks/state';
import { Chip, Flex, MenuButton } from 'shared/ui-components';

import './index.scss';

export default function LessonsChipGroup({
    lessons,
    readonly,
    onEdit,
    onDelete,
    onRefund
}) {
    return (
        <Flex className="LessonsChipGroup" gap="smaller">
            {lessons.map(lesson => ({ ...lesson, date: moment(lesson.date) })).map(lesson =>
                <LessonChip
                    key={lesson.id}
                    lesson={lesson}
                    readonly={readonly}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onRefund={onRefund}
                />
            )}
        </Flex>
    );
}

const StatusColor = {
    missed: 'warning',
    ended: 'success',
    scheduled: 'neutral',
    canceled: 'danger'
};

function LessonChip({
    lesson,
    readonly,
    onEdit = Function.prototype,
    onDelete = Function.prototype,
    onRefund = Function.prototype
}) {
    const [isMenuOpen, toggleMenuOpen] = useBoolean(false);

    const handleEdit = useCallback(() => {
        onEdit(lesson);
    }, [lesson, onEdit]);

    const handleDelete = useCallback(() => {
        onDelete(lesson);
    }, [lesson, onDelete]);

    const handleRefund = useCallback(() => {
        onRefund(lesson);
    }, [lesson, onRefund]);

    return (
        <MenuButton
            open={readonly ? false : isMenuOpen}
            trigger={
                <Chip
                    key={lesson.id || lesson.date.valueOf()}
                    className={classnames('LessonChip', `LessonChip--${lesson.status}`)}
                    variant="soft"
                    color={StatusColor[lesson.status]}
                >
                    <span>
                        <span className="lesson-date">{lesson.date.format('D.M')}</span>
                        <span className="lesson-weekday"> {lesson.date.format('dd')}</span>
                    </span>

                    <span>
                        <span className="lesson-time">{lesson.date.format('H:mm')}</span>
                        <span className="lesson-duration"> {`${lesson.duration} мин.`}</span>
                    </span>
                </Chip>
            }
            items={[
                {
                    key: 'edit',
                    content: 'Изменить',
                    onClick: handleEdit
                },
                {
                    key: 'delete',
                    content: 'Удалить',
                    onClick: handleDelete
                },
                {
                    key: 'refund',
                    content: 'Вернуть на счет',
                    disabled: lesson.status !== 'scheduled',
                    onClick: handleRefund
                }
            ]}
            onOpenChange={toggleMenuOpen}
        />
    );
}