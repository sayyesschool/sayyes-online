import React, { useCallback, useEffect, useState } from 'react';
import {
    Icon,
    TabBar, Tab
} from 'mdc-react';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import CourseDetails from 'app/components/courses/course-details';
import CourseAudios from 'app/components/courses/course-audios';
import CourseVideos from 'app/components/courses/course-videos';
import CourseUnits from 'app/components/courses/course-units';

export default function CoursePage({ match, history }) {
    const [course, actions] = useStore('courses.single');

    const [activeTab, setActiveTab] = useState('details');

    useEffect(() => {
        actions.getCourse(match.params.courseId);
    }, []);

    const handleUpdateCourse = useCallback(data => {
        return actions.updateCourse(course.id, data);
    }, [course]);

    const handleDeleteCourse = useCallback(() => {
        if (confirm('Удалить курс?')) {
            return actions.deleteCourse(course.id)
                .then(() => history.push('/courses'));
        }
    }, [course]);

    const handleCreateAudio = useCallback(data => {
        return actions.createAudio(course.id, data);
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
            >
                <TabBar value={activeTab} onChange={setActiveTab} minWidth>
                    <Tab
                        value="details"
                        label="Детали"
                        icon={<Icon>article</Icon>}
                    />

                    <Tab
                        label="Юниты"
                        value="units"
                        icon={<Icon>segment</Icon>}
                    />

                    <Tab
                        label="Аудио"
                        value="audio"
                        icon={<Icon>audiotrack</Icon>}
                    />

                    <Tab
                        label="Видео"
                        value="video"
                        icon={<Icon>movie</Icon>}
                    />
                </TabBar>
            </PageTopBar>

            <PageContent>
                {activeTab === 'details' &&
                    <CourseDetails
                        course={course}
                        onUpdate={handleUpdateCourse}
                    />
                }

                {activeTab === 'units' &&
                    <CourseUnits
                        course={course}
                    />
                }

                {activeTab === 'audio' &&
                    <CourseAudios
                        course={course}
                        onCreate={handleCreateAudio}
                    />
                }

                {activeTab === 'video' &&
                    <CourseVideos
                        course={course}
                    />
                }
            </PageContent>
        </Page>
    );
}