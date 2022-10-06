import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import { useStore } from 'app/hooks/store';
import CourseForm from 'app/components/courses/course-form';
import CoursesTable from 'app/components/courses/courses-table';

export default function CoursesPage() {
    const [courses, actions] = useStore('courses.list');

    const [isFormDialogOpen, toggleFormDialogOpen] = useBoolean(false);

    useEffect(() => {
        actions.getCourses();
    }, []);

    const handleSubmit = useCallback(data => {
        return actions.createCourse(data)
            .then(() => toggleFormDialogOpen(false));
    }, []);

    if (!courses) return <LoadingIndicator />;

    return (
        <Page id="courses">
            <Page.Header
                title="Курсы"
                toolbar={[
                    {
                        key: 'add',
                        title: 'Создать',
                        icon: 'add',
                        onClick: toggleFormDialogOpen
                    }
                ]}
            />

            <Page.Content>
                <Page.Section compact>
                    <CoursesTable
                        courses={courses}
                    />
                </Page.Section>
            </Page.Content>

            <FormDialog
                title="Новый курс"
                open={isFormDialogOpen}
                onClose={toggleFormDialogOpen}
            >
                <CourseForm
                    id="course-form"
                    onSubmit={handleSubmit}
                />
            </FormDialog>
        </Page>
    );
}