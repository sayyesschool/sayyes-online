import CoursesList from 'shared/components/courses-list';
import PageSection from 'shared/components/page-section';

export default function EnrollmentCourses({ enrollment }) {
    return (
        <PageSection className="enrollment-courses" title="Курсы">
            {enrollment.courses.length > 0 &&
                <CoursesList
                    courses={enrollment.courses}
                />
            }
        </PageSection>
    );
}