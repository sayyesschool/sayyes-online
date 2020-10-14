import React, { useState, useEffect, useCallback } from 'react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import FormPanel from 'app/components/shared/form-panel';
import LessonCalendar from 'app/components/lessons/lesson-calendar';
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
        <Page id="lessons" loading={!lessons}>
            <PageHeader
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
                <LessonCalendar
                    view={view}
                    lessons={lessons}
                />
            </PageContent>

            <FormPanel
                title="Новый урок"
                isOpen={isLessonFormOpen}
                form="lesson-form"
                onClose={() => setLessonFormOpen(!isLessonFormOpen)}
            >
                <LessonForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}