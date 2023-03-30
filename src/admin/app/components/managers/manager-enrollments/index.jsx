import PageSection from 'shared/components/page-section';

import EnrollmentsList from 'app/components/enrollments/enrollments-list';

export default function ManagerEnrollments({ manager }) {
    return (
        <PageSection
            className="sy-ManagerEnrollments"
            title="Обучение"
            compact
        >
            {manager.enrollments?.length > 0 &&
                <EnrollmentsList
                    enrollments={manager.enrollments.map(enrollment => ({
                        ...enrollment,
                        url: `${manager.url}${enrollment.url}`
                    }))}
                />
            }
        </PageSection>
    );
}