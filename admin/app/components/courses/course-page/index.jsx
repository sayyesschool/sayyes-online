import React, { useState, useEffect, useCallback } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import FormDialog from 'app/components/shared/form-dialog';
import CourseDetails from 'app/components/courses/course-details';
import CourseForm from 'app/components/courses/course-form';
import UnitForm from 'app/components/courses/unit-form';

export default function CoursePage({ match, history }) {
    const [course, actions] = useStore('courses.single');

    const [isCourseFormOpen, setCourseFormOpen] = useState(false);
    const [isUnitFormOpen, setUnitFormOpen] = useState(false);

    useEffect(() => {
        actions.getCourse(match.params.courseId);
    }, []);

    const handleUpdateCourse = useCallback(data => {
        actions.updateCourse(course.id, data)
            .then(() => setCourseFormOpen(false));
    }, [course]);

    const handleDeleteCourse = useCallback(() => {
        if (confirm('Удалить курс?')) {
            actions.deleteCourse(course.id)
                .then(() => history.push('/courses'));
        }
    }, [course]);

    const handleCreateUnit = useCallback(data => {
        actions.createUnit(course.id, data)
            .then(() => setUnitFormOpen(false));
    }, [course]);

    const handleDeleteUnit = useCallback(unit => {
        if (confirm('Удалить юнит?')) {
            actions.deleteUnit(course.id, unit.id);
        }
    }, [course]);

    const handleAddUnit = useCallback(() => {
        setUnitFormOpen(true);
    }, []);

    if (!course) return <LoadingIndicator />;

    return (
        <Page id="course-page">
            <PageHeader
                title={course.title}
                actions={[
                    {
                        key: 'edit',
                        icon: 'edit',
                        onClick: () => setCourseFormOpen(true)
                    },
                    {
                        key: 'delete',
                        icon: 'delete',
                        onClick: handleDeleteCourse
                    }
                ]}
            />

            <PageContent>
                <CourseDetails
                    course={course}
                    onAddUnit={handleAddUnit}
                    onDeleteUnit={handleDeleteUnit}
                />
            </PageContent>

            <FormDialog
                title="Редактирование курса"
                form="course-form"
                open={isCourseFormOpen}
                onClose={() => setCourseFormOpen(false)}
            >
                <CourseForm
                    course={course}
                    onSubmit={handleUpdateCourse}
                />
            </FormDialog>

            <FormDialog
                title="Новый юнит"
                form="unit-form"
                open={isUnitFormOpen}
                onClose={() => setUnitFormOpen(false)}
            >
                <UnitForm
                    onSubmit={handleCreateUnit}
                />
            </FormDialog>
        </Page>
    );
}