import { useCallback, useEffect } from 'react';

import { useBoolean } from 'shared/hooks/state';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PageSection from 'shared/components/page-section';

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
            <PageHeader
                title="Курсы"
                actions={[
                    {
                        key: 'add',
                        title: 'Создать',
                        icon: 'add',
                        onClick: toggleFormDialogOpen
                    }
                ]}
            />

            <PageContent>
                <PageSection>
                    <CoursesTable
                        courses={courses}
                    />
                </PageSection>
            </PageContent>

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