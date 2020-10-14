import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import FormDialog from 'app/components/shared/form-dialog';
import UnitDetails from 'app/components/courses/unit-details';
import UnitForm from 'app/components/courses/unit-form';
import LessonForm from 'app/components/courses/lesson-form';

import './index.scss';

export default function UnitPage({ match, history }) {
    const [course, actions] = useStore('courses.single');

    const [isUnitFormOpen, setUnitFormOpen] = useState(false);
    const [isLessonFormOpen, setLessonFormOpen] = useState(false);

    useEffect(() => {
        actions.getCourse(match.params.courseId);
    }, []);

    const handleUpdateUnit = useCallback(data => {
        actions.updateUnit(course.id, unit.id, data)
            .then(() => setUnitFormOpen(false));
    }, [course, unit]);

    const handleDeleteUnit = useCallback(() => {
        if (confirm('Удалить юнит?')) {
            actions.deleteUnit(course.id, unit.id)
                .then(() => history.push(course.url));
        }
    }, [course, unit]);

    const handleCreateLesson = useCallback(data => {
        data.unitId = unit.id;

        actions.createLesson(course.id, data)
            .then(() => setLessonFormOpen(false));
    }, [course, unit]);

    const handleDeleteLesson = useCallback(lesson => {
        if (confirm('Удалить урок?')) {
            actions.deleteLesson(course.id, lesson.id);
        }
    }, [course, unit]);

    const toggleUnitForm = useCallback(() => {
        setUnitFormOpen(isOpen => !isOpen);
    }, []);

    const toggleLessonForm = useCallback(() => {
        setLessonFormOpen(isOpen => !isOpen);
    }, []);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);

    return (
        <Page id="unit-page">
            <PageHeader
                title={
                    <>
                        <Link to={course.url}>{course.title}</Link>
                        {unit.title}
                    </>
                }
                actions={[
                    {
                        key: 'add',
                        icon: 'add',
                        title: 'Создать урок',
                        onClick: toggleLessonForm
                    },
                    {
                        key: 'edit',
                        icon: 'edit',
                        title: 'Изменить юнит',
                        onClick: toggleUnitForm
                    },
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
                    onDeleteLesson={handleDeleteLesson}
                />
            </PageContent>

            <FormDialog
                title="Редактирование юнита"
                form="unit-form"
                open={isUnitFormOpen}
                onClose={toggleUnitForm}
            >
                <UnitForm
                    unit={unit}
                    onSubmit={handleUpdateUnit}
                />
            </FormDialog>

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