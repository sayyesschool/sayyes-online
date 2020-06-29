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
    const [{ list: lessons }, actions] = useStore('lessons');

    useEffect(() => {
        actions.getLessons();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createLesson(data)
            .then(() => setLessonFormOpen(false));
    }, []);

    return (
        <Page id="lessons">
            <PageHeader
                title="Уроки"
                controls={[
                    {
                        key: 'add',
                        text: 'Создать',
                        iconProps: { iconName: 'Add' },
                        onClick: () => setLessonFormOpen(true)
                    }
                ]}
            />

            <PageContent loading={!lessons}>
                <LessonList
                    lessons={lessons}
                />
            </PageContent>

            <FormPanel
                title="Создание урока"
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