import React, { useState, useEffect, useCallback } from 'react';

import { useStore } from 'app/store';
import Page from 'app/components/shared/page';
import PageHeader from 'app/components/shared/page-header';
import PageContent from 'app/components/shared/page-content';
import FormPanel from 'app/components/shared/form-panel';
import LessonList from 'app/components/lessons/lesson-list';
import LessonForm from 'app/components/lessons/lesson-form';

export default function Lessons() {
    const [isLessonFormOpen, setLessonFormOpen] = useState(false);
    const [lessons, actions] = useStore('lessons.list');

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
                    }
                ]}
            />

            <PageContent>
                <LessonList
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