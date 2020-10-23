import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    Icon,
    Layout,
    LayoutGrid, LayoutGridCell,
    Spinner,
    Typography
} from 'mdc-react';

import { useStore } from 'shared/hooks/store';

import { actions as lessonActions } from 'app/store/modules/lessons';

import FormDialog from 'app/components/shared/form-dialog';
import ConfirmationDialog from 'app/components/shared/confirmation-dialog';

import LessonForm from 'app/components/lessons/lesson-form';
import LessonDetails from 'app/components/lessons/lesson-details';

import './index.scss';

export default function LessonPage({ match, history }) {
    const [isLessonFormOpen, setLessonFormOpen] = useState(false);
    const [isRegistrationFormOpen, setRegistrationFormOpen] = useState(false);
    const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    const [lesson, actions] = useStore(
        state => state.lessons.single,
        lessonActions
    );

    useEffect(() => {
        actions.getLesson(match.params.lessonId);
    }, []);

    const handleLessonChange = useCallback(data => {
        actions.updateLesson(lesson.id, data)
            .then(() => setLessonFormOpen(false));
    }, [lesson]);

    const handleLessonDelete = useCallback(() => {
        actions.deleteLesson(lesson.id)
            .then(() => history.push('/lessons'));
    }, [lesson]);

    if (!lesson) return <Spinner />;

    return (
        <main id="lesson-page" className="page">
            <Layout element="header" row justifyContent="between">
                <Typography element="h1" type="headline4" noMargin>{lesson.title}</Typography>

                <Layout>
                    <Button
                        leadingIcon={<Icon>edit</Icon>}
                        outlined
                        onClick={() => setLessonFormOpen(true)}
                    >
                        Редактировать
                    </Button>

                    <Button
                        leadingIcon={<Icon>delete</Icon>}
                        outlined
                        onClick={() => setConfirmationDialogOpen(true)}
                    >
                        Удалить
                    </Button>
                </Layout>
            </Layout>

            <LayoutGrid>
                <LayoutGridCell span="4">
                    <LessonDetails
                        lesson={lesson}
                    />
                </LayoutGridCell>
            </LayoutGrid>

            <FormDialog
                title="Редактирование урока"
                open={isLessonFormOpen}
                form="meeting-form"
                onClose={() => setLessonFormOpen(false)}
            >
                <LessonForm
                    lesson={lesson}
                    onSubmit={handleLessonChange}
                />
            </FormDialog>

            <ConfirmationDialog
                title="Удалить урок?"
                open={isConfirmationDialogOpen}
                onConfirm={handleLessonDelete}
                onClose={() => setConfirmationDialogOpen(false)}
            />
        </main>
    );
}