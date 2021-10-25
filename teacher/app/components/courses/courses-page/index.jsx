import { useCourses } from 'shared/hooks/courses';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageTopBar from 'shared/components/page-top-bar';
import PageContent from 'shared/components/page-content';
import CoursesGrid from 'shared/components/courses-grid';

export default function CoursesPage() {
    const [courses] = useCourses();

    if (!courses) return <LoadingIndicator />;

    return (
        <Page id="courses">
            <PageTopBar
                title="Курсы"
            />

            <PageContent>
                <CoursesGrid
                    courses={courses}
                />
            </PageContent>
        </Page>
    );
}