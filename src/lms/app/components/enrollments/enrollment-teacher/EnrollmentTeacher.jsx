import PageSection from 'shared/components/page-section';
import { Avatar, List } from 'shared/ui-components';

export default function EnrollmentTeacher({ enrollment }) {
    const { teacher } = enrollment;

    return (
        <PageSection
            className="EnrollmentTeacher"
            title="Преподаватель"
            compact
        >
            <List>
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
            </List>
        </PageSection>
    );
}