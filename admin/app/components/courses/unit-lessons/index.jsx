import React, { useCallback } from 'react';
import {
    Card,
    Icon,
    IconButton
} from 'mdc-react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';

import LessonList from 'app/components/courses/lesson-list';
import LessonForm from 'app/components/courses/lesson-form';

export default function UnitLessons({ course, unit, onCreate, onDelete }) {
    const [isLessonFormOpen, toggleLessonFormOpen] = useBoolean(false);

    const lessons = unit.lessons.map(id => course.lessonsById.get(id)).filter(id => id !== undefined);

    const handleSubmit = useCallback(data => {
        onCreate(data)
            .then(() => toggleLessonFormOpen(false));
    }, [onCreate]);

    return (
        <section className="unit-lessons">
            <Card>
                <Card.Header
                    graphic={<Icon>school</Icon>}
                    title="Уроки"
                    actions={
                        <IconButton
                            icon="add"
                            onClick={toggleLessonFormOpen}
                        />
                    }
                />

                {unit.lessons.length > 0 &&
                    <Card.Section>
                        <LessonList
                            lessons={lessons}
                            onDelete={onDelete}
                        />
                    </Card.Section>
                }
            </Card>

            <FormDialog
                title="Новый урок"
                form="lesson-form"
                open={isLessonFormOpen}
                onClose={toggleLessonFormOpen}
            >
                <LessonForm
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </section>
    );
}