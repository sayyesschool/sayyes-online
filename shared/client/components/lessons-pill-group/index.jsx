import { useCallback } from 'react';
import classnames from 'classnames';
import moment from 'moment';

import { useBoolean } from 'shared/hooks/state';
import { Icon, MenuButton, Pill, PillGroup } from 'shared/ui-components';

import './index.scss';

export default function LessonsPillGroup({
    lessons,
    readonly,
    onEdit,
    onDelete,
    onRefund
}) {
    return (
        <PillGroup className="lessons-pill-group">
            {lessons.map(lesson => ({ ...lesson, date: moment(lesson.date) })).map(lesson =>
                <LessonPill
                    key={lesson.id}
                    lesson={lesson}
                    readonly={readonly}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onRefund={onRefund}
                />
            )}
        </PillGroup>
    );
}

function LessonPill({ lesson, readonly, onEdit = Function.prototype, onDelete = Function.prototype, onRefund = Function.prototype }) {
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
        <Pill
            key={lesson.id || lesson.date.valueOf()}
            className={classnames('lesson-pill', `lesson-pill--${lesson.status}`)}
            //icon={lesson.trial ? <Icon>tour</Icon> : undefined}
            action={!readonly &&
                <MenuButton
                    open={isMenuOpen}
                    trigger={<Icon name="more_vert" />}
                    onOpenChange={toggleMenuOpen}
                    menu={[
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
                />
            }
            onDismiss={!readonly && toggleMenuOpen}
            rectangular
            actionable={!readonly}
        >
            <span>
                <span className="lesson-date">{lesson.date.format('D.M')}</span>
                <span className="lesson-weekday"> {lesson.date.format('dd')}</span>
            </span>

            <span>
                <span className="lesson-time">{lesson.date.format('H:mm')}</span>
                <span className="lesson-duration"> {`${lesson.duration} мин.`}</span>
            </span>
        </Pill>
    );
}