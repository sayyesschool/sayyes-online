import React, { useState, useEffect, useCallback } from 'react';

import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
import FormPanel from 'app/components/shared/form-panel';
import LessonsTable from 'app/components/lessons/lessons-table';
import LessonForm from 'app/components/lessons/lesson-form';

export default function Lessons() {
    const [lessons, actions] = useStore('lessons.list');
    const [view, setView] = useState('week');

    const [isLessonFormOpen, setLessonFormOpen] = useState(false);

    useEffect(() => {
        actions.getLessons();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createLesson(data)
            .then(() => setLessonFormOpen(false));
    }, []);

    return (
        <Page id="lessons-page" loading={!lessons}>
            <PageTopBar
                title="Уроки"
                controls={[
                    {
                        key: 'add',
                        title: 'Создать',
                        icon: 'add',
                        onClick: () => setLessonFormOpen(true)
                    },
                    {
                        key: 'view',
                        title: 'Представление',
                        icon: view === 'week' ? 'today' : 'view_week',
                        onClick: () => setView(view => view === 'week' ? 'month' : 'week')
                    }
                ]}
            />

            <PageContent>
                <LessonsTable
                    lessons={lessons}
                />
            </PageContent>

            <FormPanel
                form="lesson-form"
                title="Новый урок"
                isOpen={isLessonFormOpen}
                modal
                onClose={() => setLessonFormOpen(!isLessonFormOpen)}
            >
                <LessonForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}