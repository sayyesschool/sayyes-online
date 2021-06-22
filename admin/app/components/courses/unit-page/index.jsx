import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    LayoutGrid
} from 'mdc-react';

import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import UnitDetails from 'app/components/courses/unit-details';
import UnitLessons from 'app/components/courses/unit-lessons';
import UnitContent from 'app/components/courses/unit-content';

import './index.scss';

export default function UnitPage({ match, history }) {
    const [course, actions] = useCourse(match.params.courseId);

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
                <LayoutGrid>
                    <LayoutGrid.Cell span="4" grid>
                        <LayoutGrid.Cell span="12">
                            <UnitDetails
                                unit={unit}
                                onUpdate={handleUpdateUnit}
                            />
                        </LayoutGrid.Cell>

                        <LayoutGrid.Cell span="12">
                            <UnitLessons
                                course={course}
                                unit={unit}
                                onCreate={handleCreateLesson}
                                onDelete={handleDeleteLesson}
                            />
                        </LayoutGrid.Cell>
                    </LayoutGrid.Cell>

                    <LayoutGrid.Cell span="8">
                        <UnitContent
                            unit={unit}
                            onUpdate={handleUpdateUnit}
                        />
                    </LayoutGrid.Cell>
                </LayoutGrid>
            </PageContent>
        </Page>
    );
}