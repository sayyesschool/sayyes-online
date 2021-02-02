import React, { useCallback } from 'react';
import {
    Card,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';

import { useActions } from 'app/hooks/store';
import FormPanel from 'app/components/shared/form-panel';
import LessonForm from 'app/components/lessons/lesson-form';

export default function EnrollmentLessons({ enrollment }) {
    const actions = useActions('lessons');

    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    const handleCreateLesson = useCallback(data => {
        data.enrollment = enrollment.id;

        actions.createLesson(data)
            .then(() => toggleFormOpen(false));
    }, [enrollment]);

    const handleDeleteLesson = useCallback(lesson => {
        if (confirm('Вы уверены что хотите удалить урок?')) {
            actions.deleteLesson(lesson.id);
        }
    }, []);

    return (
        <section className="enrollment-lessons">
            <Card>
                <Card.Header
                    title="Занятия"
                    subtitle={enrollment.lessons.length === 0 && 'Занятий нет'}
                    actions={
                        <IconButton
                            icon="add"
                            onClick={toggleFormOpen}
                        />
                    }
                />

                {enrollment.lessons.length > 0 &&
                    <Card.Section>
                        <List twoLine>
                            {enrollment.lessons.map(lesson =>
                                <List.Item
                                    key={lesson.id}
                                    primaryText={lesson.trial ? 'Пробный урок' : 'Урок'}
                                    secondaryText={lesson.datetime}
                                    meta={
                                        <IconButton
                                            icon="remove"
                                            title="Убрать курс"
                                            onClick={() => handleDeleteLesson(lesson)}
                                        />
                                    }
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>

            <FormPanel
                form="lesson-form"
                title="Новое занятие"
                open={isFormOpen}
                modal
                onClose={toggleFormOpen}
            >
                <LessonForm
                    lesson={{
                        client: enrollment?.client
                    }}
                    onSubmit={handleCreateLesson}
                />
            </FormPanel>
        </section>
    );
}