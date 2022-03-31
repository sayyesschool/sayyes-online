import { useCallback, useState } from 'react';
import { Box, Grid } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import { useCourse } from 'shared/hooks/courses';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import Tabs from 'shared/components/tabs';

import CourseAudios from 'app/components/courses/course-audios';
import CourseDetails from 'app/components/courses/course-details';
import CourseImage from 'app/components/courses/course-image';
import CourseUnits from 'app/components/courses/course-units';
import CourseVideos from 'app/components/courses/course-videos';

import './index.scss';

export default function CoursePage({ match, history }) {
    const [course, actions] = useCourse(match.params.courseId);

    const [activeTab, setActiveTab] = useState('units');
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleUpdateCourse = useCallback(data => {
        return actions.updateCourse(course.id, data);
    }, [course]);

    const handleDeleteCourse = useCallback(() => {
        return actions.deleteCourse(course.id)
            .then(() => history.push('/courses'));
    }, [course]);

    const handleCreateUnit = useCallback(data => {
        return actions.createUnit(course.id, data);
    }, [course]);

    const handleDeleteUnit = useCallback(unit => {
        return actions.deleteUnit(course.id, unit.id);
    }, [course]);

    if (!course) return <LoadingIndicator />;

    return (
        <Page id="course-page">
            <PageHeader
                breadcrumbs={[
                    { key: 'courses', text: 'Курсы', url: '/courses' }
                ]}
                overline="Курс"
                title={course.title}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <PageContent>
                {/* <Tabs
                    items={[
                        {
                            key: 'units',
                            value: 'units',
                            content: 'Юниты',
                            icon: 'segment'
                        },
                        {
                            key: 'audio',
                            value: 'audio',
                            content: 'Аудио',
                            icon: 'audiotrack'
                        },
                        {
                            key: 'video',
                            value: 'video',
                            content: 'Видео',
                            icon: 'movie'
                        }
                    ]}
                    onChange={setActiveTab}
                /> */}

                <Grid columns="minmax(0, 2fr) minmax(0, 1fr)">
                    <Box>
                        {activeTab === 'units' &&
                            <CourseUnits
                                course={course}
                                onCreate={handleCreateUnit}
                                onDelete={handleDeleteUnit}
                            />
                        }

                        {activeTab === 'audio' &&
                            <CourseAudios
                                course={course}
                                onCreate={actions.createAudio}
                                onUpdate={actions.updateAudio}
                                onDelete={actions.deleteAudio}
                            />
                        }

                        {activeTab === 'video' &&
                            <CourseVideos
                                course={course}
                            />
                        }
                    </Box>

                    <Box>
                        <CourseDetails
                            course={course}
                            onUpdate={handleUpdateCourse}

                        />

                        <CourseImage
                            course={course}
                            onUpdate={handleUpdateCourse}
                        />
                    </Box>
                </Grid>
            </PageContent>

            <ConfirmationDialog
                title="Удалить курс?"
                message={`Курс "${course.title}" будет удален без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteCourse}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}