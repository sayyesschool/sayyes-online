import { Link } from 'react-router-dom';
import { Avatar, List } from '@fluentui/react-northstar';

import Icon from 'shared/components/icon';
import PageSection from 'shared/components/page-section';

export default function TeacherEnrollments({ teacher }) {
    return (
        <PageSection className="teacher-enrollments" title="Обучение" compact>
            {teacher.enrollments?.length > 0 &&
                <List>
                    {teacher.enrollments.map(enrollment =>
                        <List.Item
                            key={enrollment.id}
                            component={Link}
                            to={`${teacher.url}${enrollment.url}`}
                            media={<Icon>{enrollment.statusIcon}</Icon>}
                            header={enrollment.domainLabel}
                            content={enrollment.statusLabel}
                            endMedia={enrollment.client &&
                                <Avatar text={enrollment.client.initials} title={enrollment.client.fullname} />
                            }
                        />
                    )}
                </List>
            }
        </PageSection>
    );
}