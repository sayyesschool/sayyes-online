import React from 'react';
import {
    Card,
    IconButton,
    List
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';

import FormPanel from 'app/components/shared/form-panel';
import LessonForm from 'app/components/lessons/lesson-form';

export default function EnrollmentLessons({ enrollment, onCreate, onDelete }) {
    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    return (
        <section className="enrollment-lessons">
            <Card>
                <Card.Header
                    title="Занятия"
                    actions={
                        <IconButton
                            icon="add"
                            onClick={toggleFormOpen}
                        />
                    }
                />

                <Card.Section>
                    <List twoLine>
                        {enrollment.lessons.map(lesson =>
                            <List.Item
                                primaryText={lesson.trial ? 'Пробный урок' : 'Урок'}
                                secondaryText={lesson.datetime}
                                meta={
                                    <IconButton
                                        icon="remove"
                                        title="Убрать курс"
                                        onClick={() => onDelete(lesson)}
                                    />
                                }
                            />
                        )}
                    </List>
                </Card.Section>
            </Card>

            <FormPanel
                title="Новое занятие"
                form="lesson-form"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <LessonForm
                    lesson={{
                        client: enrollment?.client
                    }}
                    onSubmit={onCreate}
                />
            </FormPanel>
        </section>
    );
}