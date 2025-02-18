import PageSection from 'shared/components/page-section';

import EnrollmentsList from 'crm/components/enrollments/enrollments-list';

export default function ManagerEnrollments({ manager }) {
    return (
        <PageSection
            className="rEnrollments"
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