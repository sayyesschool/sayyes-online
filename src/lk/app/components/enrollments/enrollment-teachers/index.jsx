import PageSection from 'shared/components/page-section';
import { Avatar, List, Text } from 'shared/ui-components';

export default function EnrollmentTeachers({ enrollment }) {
    return (
        <PageSection
            className="EnrollmentTeachers"
            title={enrollment.managers.length > 1 ? 'Преподаватели' : 'Преподаватель'}
            compact
        >
            <List>
                {enrollment.teachers.map(teacher =>
                    <List.Item
                        key={teacher.id}
                        decorator={
                            <Avatar
                                imageUrl={teacher.imageUrl}
                                text={teacher.initials}
                            />
                        }
                        content={teacher.fullname}
                    />
                )}
            </List>
        </PageSection>
    );
}