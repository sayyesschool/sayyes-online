import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    Icon,
    Layout,
    Typography
} from 'mdc-react';

import { useStore } from 'shared/hooks/store';

import { actions as lessonActions } from 'app/store/modules/lessons';

import FormDialog from 'app/components/shared/form-dialog';
import LessonList from 'app/components/lessons/lesson-list';
import LessonForm from 'app/components/lessons/lesson-form';

export default function Lessons() {
    const [isLessonFormOpen, setLessonFormOpen] = useState(false);

    const [state, actions] = useStore(
        state => state.lessons.list,
        lessonActions
    );

    useEffect(() => {
        actions.getLessons();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createLesson(data)
            .then(() => setLessonFormOpen(false));
    }, []);

    const lessons = [...state].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <main id="lessons-page" className="page">
            <Layout element="header" row justifyContent="between">
                <Typography element="h1" variant="headline4">Уроки</Typography>

                <Button
                    leadingIcon={<Icon>add</Icon>}
                    outlined
                    onClick={() => setLessonFormOpen(true)}
                >
                    Создать
                </Button>
            </Layout>

            {lessons.length === 0 ?
                <Typography>Уроков нет</Typography>
                :
                <LessonList
                    lessons={lessons}
                />
            }

            <FormDialog
                title="Создание урока"
                open={isLessonFormOpen}
                form="lesson-form"
                onClose={() => setLessonFormOpen(!isLessonFormOpen)}
            >
                <LessonForm
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </main>
    );
}