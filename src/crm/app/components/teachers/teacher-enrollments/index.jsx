import { Link } from 'react-router-dom';

import { Avatar, Icon, List } from 'shared/ui-components';
import PageSection from 'shared/components/page-section';

export default function TeacherEnrollments({ teacher }) {
    return (
        <PageSection className="TeacherEnrollments" title="Обучение" compact>
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
                            endMedia={enrollment.learner &&
                                <Avatar text={enrollment.learner.initials} title={enrollment.learner.fullname} />
                            }
                        />
                    )}
                </List>
            }
        </PageSection>
    );
}