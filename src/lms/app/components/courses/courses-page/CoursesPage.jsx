import CoursesGrid from 'shared/components/courses-grid';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useCourses } from 'shared/hooks/courses';

export default function CoursesPage() {
    const [courses] = useCourses();

    if (!courses) return <LoadingIndicator />;

    return (
        <Page className="CoursesPage">
            <Page.Header
                title="Курсы"
            />

            <Page.Content>
                <CoursesGrid
                    courses={courses}
                />
            </Page.Content>
        </Page>
    );
}