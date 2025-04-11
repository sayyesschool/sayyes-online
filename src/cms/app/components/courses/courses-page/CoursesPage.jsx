import { useCallback, useEffect } from 'react';

import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useBoolean } from 'shared/hooks/state';

import CourseForm from 'cms/components/courses/course-form';
import CoursesTable from 'cms/components/courses/courses-table';
import { useStore } from 'cms/store';

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

    if (!courses) return <LoadingIndicator fullscreen />;

    return (
        <Page className="CoursesPage">
            <Page.Header
                title="Курсы"
                actions={[
                    {
                        key: 'add',
                        content: 'Создать курс',
                        icon: 'add',
                        variant: 'solid',
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