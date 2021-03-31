import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';
import FormDialog from 'shared/components/form-dialog';

import { useStore } from 'app/hooks/store';
import UnitDetails from 'app/components/courses/unit-details';
import LessonForm from 'app/components/courses/lesson-form';

import './index.scss';

export default function UnitPage({ match, history }) {
    const [course, actions] = useStore('courses.single');

    const [isLessonFormOpen, setLessonFormOpen] = useState(false);

    useEffect(() => {
        actions.getCourse(match.params.courseId);
    }, []);

    const handleUpdateUnit = useCallback(data => {
        actions.updateUnit(course.id, unit.id, data);
    }, [course, unit]);

    const handleDeleteUnit = useCallback(() => {
        if (confirm('Удалить юнит?')) {
            actions.deleteUnit(course.id, unit.id)
                .then(() => history.push(course.url));
        }
    }, [course, unit]);

    const handleCreateLesson = useCallback(data => {
        data.unit = unit.id;

        actions.createLesson(course.id, data)
            .then(() => setLessonFormOpen(false));
    }, [course, unit]);

    const handleDeleteLesson = useCallback(lesson => {
        if (confirm('Удалить урок?')) {
            actions.deleteLesson(course.id, lesson.id);
        }
    }, [course, unit]);

    const toggleLessonForm = useCallback(() => {
        setLessonFormOpen(isOpen => !isOpen);
    }, []);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);

    return (
        <Page id="unit-page">
            <PageTopBar
                breadcrumbs={[
                    <Link to={course.url}>{course.title}</Link>
                ]}
                title={unit.title}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить юнит',
                        onClick: handleDeleteUnit
                    }
                ]}
            />

            <PageContent>
                <UnitDetails
                    unit={unit}
                    onUpdate={handleUpdateUnit}
                    onAddLesson={toggleLessonForm}
                    onDeleteLesson={handleDeleteLesson}
                />
            </PageContent>

            <FormDialog
                title="Новый урок"
                form="lesson-form"
                open={isLessonFormOpen}
                onClose={toggleLessonForm}
            >
                <LessonForm
                    onSubmit={handleCreateLesson}
                />
            </FormDialog>
        </Page>
    );
}