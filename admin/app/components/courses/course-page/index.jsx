import React, { useState, useEffect, useCallback } from 'react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';
import FormDialog from 'shared/components/form-dialog';

import { useStore } from 'app/hooks/store';
import CourseDetails from 'app/components/courses/course-details';
import UnitForm from 'app/components/courses/unit-form';

export default function CoursePage({ match, history }) {
    const [course, actions] = useStore('courses.single');

    const [isUnitFormOpen, setUnitFormOpen] = useState(false);

    useEffect(() => {
        actions.getCourse(match.params.courseId);
    }, []);

    const handleUpdateCourse = useCallback(data => {
        actions.updateCourse(course.id, data);
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
            actions.deleteUnit(course.id, unit.id)
                .then(() => history.push(course.url));
        }
    }, [course]);

    const handleAddUnit = useCallback(() => {
        setUnitFormOpen(true);
    }, []);

    if (!course) return <LoadingIndicator />;

    return (
        <Page id="course-page">
            <PageTopBar
                title={course.title}
                actions={[
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
                    onUpdate={handleUpdateCourse}
                    onAddUnit={handleAddUnit}
                    onDeleteUnit={handleDeleteUnit}
                />
            </PageContent>

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