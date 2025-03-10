import { useCallback } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import EditableText from 'shared/components/editable-text';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useSection } from 'shared/hooks/courses';
import { useBoolean } from 'shared/hooks/state';
import { Grid } from 'shared/ui-components';

import SectionDescription from 'cms/components/courses/section-description';
import SectionExercises from 'cms/components/courses/section-exercises';

export default function SectionPage({ match, history }) {
    const { course, unit, lesson, section, actions } = useSection(match.params);

    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleUpdateSection = useCallback(data => {
        return actions.updateSection(course.id, section.id, data);
    }, [course, section]);

    const handleUpdateSectionTitle = useCallback(title => {
        return actions.updateSection(course.id, section.id, { title });
    }, [course, section]);

    const handleDeleteSection = useCallback(() => {
        return actions.deleteSection(course.id, section.id)
            .then(() => history.push(lesson.url));
    }, [course, lesson, section]);

    const handleCreateExercise = useCallback(data => {
        data.sectionId = section.id;

        return actions.createExercise(course.id, data);
    }, [course, lesson, section]);

    const handleDeleteExercise = useCallback(exercise => {
        return actions.deleteExercise(course.id, exercise.id);
    }, [course]);

    if (!section) return <LoadingIndicator fluid />;

    return (
        <Page className="SectionPage">
            <Page.Header
                title={
                    <EditableText
                        content={section.title}
                        required
                        onUpdate={handleUpdateSectionTitle}
                    />
                }
                breadcrumbs={[
                    { key: 'course', content: course.title, to: course.uri, title: 'Курс' },
                    { key: 'unit', content: unit.title, to: unit.uri, title: 'Юнит' },
                    { key: 'lesson', content: lesson.title, to: lesson.uri, title: 'Урок' }
                ]}
                actions={[
                    {
                        key: 'delete',
                        icon: 'delete',
                        title: 'Удалить секцию',
                        onClick: toggleConfirmationDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item xs={7}>
                        <SectionExercises
                            course={course}
                            section={section}
                            onCreate={handleCreateExercise}
                            onDelete={handleDeleteExercise}
                            onReorder={handleUpdateSection}
                        />
                    </Grid.Item>

                    <Grid.Item xs={5}>
                        <SectionDescription
                            section={section}
                            onUpdate={handleUpdateSection}
                        />
                    </Grid.Item>
                </Grid>
            </Page.Content>

            <ConfirmationDialog
                title="Удалить секцию?"
                message={`Секция "${section.title}" будет удалена без возможности восстановления.`}
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteSection}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}