import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSection from 'shared/components/page-section';

import { useStore } from 'app/hooks/store';
import LessonsTable from 'app/components/lessons/lessons-table';
import LessonForm from 'app/components/lessons/lesson-form';

export default function Lessons() {
    const [lessons, actions] = useStore('lessons.list');

    const [isFormOpen, toggleFormOpen] = useBoolean(false);

    useEffect(() => {
        actions.getLessons();
    }, []);

    const handleSubmit = useCallback(data => {
        return actions.createLesson(data)
            .then(() => toggleFormOpen(false));
    }, []);

    if (!lessons) return <LoadingIndicator />;

    return (
        <Page id="lessons-page">
            <PageHeader
                title="Уроки"
                actions={[
                    {
                        key: 'add',
                        title: 'Создать',
                        icon: 'add',
                        onClick: toggleFormOpen
                    }
                ]}
            />

            <PageContent>
                <PageSection>
                    <LessonsTable
                        lessons={lessons}
                    />
                </PageSection>
            </PageContent>

            <FormDialog
                title="Новый урок"
                open={isFormOpen}
                onClose={toggleFormOpen}
            >
                <LessonForm
                    id="lesson-form"
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}