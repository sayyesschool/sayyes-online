import {
    Card
} from 'mdc-react';

import CoursesList from 'shared/components/courses-list';

export default function EnrollmentCourses({ enrollment }) {
    return (
        <section className="enrollment-courses">
            <Card>
                <Card.Header
                    title="Курсы"
                />

                {enrollment.courses.length > 0 &&
                    <Card.Section>
                        <CoursesList
                            courses={enrollment.courses}
                        />
                    </Card.Section>
                }
            </Card>
        </section>
    );
}