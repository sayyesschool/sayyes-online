import { useCallback } from 'react';

import PageFAB from 'shared/components/page-fab';

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
            <LessonList
                lessons={lessons}
                onDelete={onDelete}
            />

            <FormDialog
                title="Новый урок"
                form="lesson-form"
                open={isLessonFormOpen}
                fullscreen
                onClose={toggleLessonFormOpen}
            >
                <LessonForm
                    onSubmit={handleSubmit}
                />
            </FormDialog>

            <PageFAB
                icon="add"
                onClick={toggleLessonFormOpen}
            />
        </section>
    );
}