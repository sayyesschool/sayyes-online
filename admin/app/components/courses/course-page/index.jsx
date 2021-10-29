import { useCallback, useEffect, useState } from 'react';
import {
    Card,
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

import './index.scss';

export default function CoursePage({ match, history }) {
    const [course, actions] = useStore('courses.single');

    const [activeTab, setActiveTab] = useState('units');

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
                <TabBar value={activeTab} onChange={setActiveTab} minWidth minWidthIndicator>
                    <Tab
                        value="units"
                        label="Юниты"
                        icon="segment"
                    />

                    <Tab
                        value="details"
                        label="Детали"
                        icon="article"
                    />

                    <Tab
                        value="audio"
                        label="Аудио"
                        icon="audiotrack"
                    />

                    <Tab
                        value="video"
                        label="Видео"
                        icon="movie"
                    />
                </TabBar>
            </PageTopBar>

            <PageContent>
                <Card>
                    {activeTab === 'units' &&
                        <Card.Section>
                            <CourseUnits
                                course={course}
                            />
                        </Card.Section>
                    }

                    {activeTab === 'details' &&
                        <Card.Section primary>
                            <CourseDetails
                                course={course}
                                onUpdate={handleUpdateCourse}
                            />
                        </Card.Section>
                    }

                    {activeTab === 'audio' &&
                        <Card.Section>
                            <CourseAudios
                                course={course}
                                onCreate={actions.createAudio}
                                onUpdate={actions.updateAudio}
                                onDelete={actions.deleteAudio}
                            />
                        </Card.Section>
                    }

                    {activeTab === 'video' &&
                        <Card.Section>
                            <CourseVideos
                                course={course}
                            />
                        </Card.Section>
                    }
                </Card>
            </PageContent>
        </Page>
    );
}