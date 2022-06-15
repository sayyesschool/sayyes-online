import { Avatar, List } from '@fluentui/react-northstar';

import PageSection from 'shared/components/page-section';

import './index.scss';

export default function EnrollmentTeachers({ enrollment }) {
    return (
        <PageSection
            className="enrollment-teacher"
            title={enrollment.managers.length > 1 ? 'Преподаватели' : 'Преподаватель'}
        >
            <List>
                {enrollment.teachers.map(teacher =>
                    <List.Item
                        key={teacher.id}
                        media={
                            <Avatar
                                image={teacher.imageUrl}
                                name={teacher.fullname}
                                size="large"
                            />
                        }
                        header={teacher.firstname}
                        content={teacher.lastname}
                    />
                )}
            </List>
        </PageSection>
    );
}