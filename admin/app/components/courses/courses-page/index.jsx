import { useCallback, useEffect, useState } from 'react';

import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';

import { useStore } from 'app/hooks/store';
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
            <PageTopBar
                title="Курсы"
                actions={[
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
                form="course-form"
                title="Новый курс"
                open={isCourseFormOpen}
                modal
                onClose={() => setCourseFormOpen(!isCourseFormOpen)}
            >
                <CourseForm
                    onSubmit={handleSubmit}
                />
            </FormPanel>
        </Page>
    );
}