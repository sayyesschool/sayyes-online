import { useCallback, useState } from 'react';
import { Box, Grid } from '@fluentui/react-northstar';

import { useBoolean } from 'shared/hooks/state';
import { use } from 'shared/hooks/courses';
import ConfirmationDialog from 'shared/components/confirmation-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import Tabs from 'shared/components/tabs';

import UnitContent from 'app/components/courses/unit-content';
import UnitDetails from 'app/components/courses/unit-details';
import UnitImage from 'app/components/courses/unit-image';
import UnitLessons from 'app/components/courses/unit-lessons';

import './index.scss';

export default function UnitPage({ match, history }) {
    const { course, unit, actions } = use(match.params);

    const [activeTab, setActiveTab] = useState('lessons');
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleUpdateUnit = useCallback(data => {
        return actions.updateUnit(course.id, unit.id, data);
    }, [course, unit]);

    const handleDeleteUnit = useCallback(() => {
        return actions.deleteUnit(course.id, unit.id)
            .then(() => history.push(course.uri));
    }, [course, unit]);

    const handleCreateLesson = useCallback(data => {
        data.unitId = unit.id;

        return actions.createLesson(course.id, data);
    }, [course, unit]);

    const handleDeleteLesson = useCallback(lesson => {
        return actions.deleteLesson(course.id, lesson.id);
    }, [course]);

    if (!unit) return <LoadingIndicator />;

    return (
        <Page id="unit-page">
            <PageHeader
                overline="Юнит"
                title={unit.title}
                breadcrumbs={[
                    { key: 'courses', text: 'Курсы', url: '/courses' },
                    { key: 'course', text: course.title, url: course.uri }
                ]}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить юнит',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <PageContent>
                <Tabs
                    items={[
                        {
                            key: 'lessons',
                            value: 'lessons',
                            content: 'Уроки',
                            icon: 'format_list_bulleted'
                        },
                        {
                            key: 'content',
                            value: 'content',
                            content: 'Содержание',
                            icon: 'description'
                        }
                    ]}
                    onChange={setActiveTab}
                />

                <Grid columns="minmax(0, 2fr) minmax(0, 1fr)">
                    <Box>
                        {activeTab === 'lessons' &&
                            <UnitLessons
                                course={course}
                                unit={unit}
                                onCreate={handleCreateLesson}
                                onDelete={handleDeleteLesson}
                            />
                        }

                        {activeTab === 'content' &&
                            <UnitContent
                                unit={unit}
                                onUpdate={handleUpdateUnit}
                            />
                        }
                    </Box>

                    <Box>
                        <UnitDetails
                            unit={unit}
                            onUpdate={handleUpdateUnit}
                        />

                        <UnitImage
                            unit={unit}
                            onUpdate={handleUpdateUnit}
                        />
                    </Box>
                </Grid>
            </PageContent>

            <ConfirmationDialog
                title="Удалить юнит?"
                message={`Юнит "${unit.title}" будет удален без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteUnit}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}