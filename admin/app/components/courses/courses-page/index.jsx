import React, { useState, useEffect, useCallback } from 'react';

import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/store';
import FormPanel from 'app/components/shared/form-panel';
import CourseTable from 'app/components/courses/course-table';
import CourseForm from 'app/components/courses/course-form';

export default function CoursesPage() {
    const [courses, actions] = useStore('courses.list');
    const [isCourseFormOpen, setCourseFormOpen] = useState(false);

    useEffect(() => {
        actions.getCourses();
    }, []);

    const handleSubmit = useCallback(data => {
        actions.createCourse(data)
            .then(() => setCourseFormOpen(false));
    }, []);

    return (
        <Page id="courses" loading={!courses}>
            <PageHeader
                title="Курсы"
                controls={[
                    {
                        key: 'add',
                        title: 'Создать',
                        icon: 'add',
                        onClick: () => setCourseFormOpen(true)
                    }
                ]}
            />

            <PageContent>
                <CourseTable
                    courses={courses}
                />
            </PageContent>

            <FormPanel
                title="Новый курс"
                isOpen={isCourseFormOpen}
                form="course-form"
                onClose={() => setCourseFormOpen(!isCourseFormOpen)}
            >
                <CourseForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}