import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Icon,
    TabBar, Tab
} from 'mdc-react';

import { useCourse } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import UnitDetails from 'app/components/courses/unit-details';
import UnitLessons from 'app/components/courses/unit-lessons';

import './index.scss';

export default function UnitPage({ match, history }) {
    const [course, actions] = useCourse(match.params.courseId);

    const [activeTab, setActiveTab] = useState('details');

    const handleUpdateUnit = useCallback(data => {
        return actions.updateUnit(course.id, unit.id, data);
    }, [course, unit]);

    const handleDeleteUnit = useCallback(() => {
        if (confirm('Удалить юнит?')) {
            return actions.deleteUnit(course.id, unit.id)
                .then(() => history.push(course.url));
        }
    }, [course, unit]);

    const handleCreateLesson = useCallback(data => {
        data.unit = unit.id;

        return actions.createLesson(course.id, data);
    }, [course, unit]);

    const handleDeleteLesson = useCallback(lesson => {
        if (confirm('Удалить урок?')) {
            return actions.deleteLesson(course.id, lesson.id);
        }
    }, [course, unit]);

    if (!course) return <LoadingIndicator />;

    const unit = course.unitsById.get(match.params.unitId);

    return (
        <Page id="unit-page">
            <PageTopBar
                breadcrumbs={[
                    <Link to={course.uri}>{course.title}</Link>
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
            >
                <TabBar value={activeTab} onChange={setActiveTab} minWidth>
                    <Tab
                        value="details"
                        label="Детали"
                        icon={<Icon>article</Icon>}
                    />

                    <Tab
                        value="lessons"
                        label="Уроки"
                        icon={<Icon>segment</Icon>}
                    />
                </TabBar>
            </PageTopBar>

            <PageContent>
                {activeTab === 'details' &&
                    <UnitDetails
                        unit={unit}
                        onUpdate={handleUpdateUnit}
                    />
                }

                {activeTab === 'lessons' &&
                    <UnitLessons
                        course={course}
                        unit={unit}
                        onCreate={handleCreateLesson}
                        onDelete={handleDeleteLesson}
                    />
                }
            </PageContent>
        </Page>
    );
}