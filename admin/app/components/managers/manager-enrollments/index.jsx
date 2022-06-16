import { Link } from 'react-router-dom';
import { Avatar, List } from '@fluentui/react-northstar';

import PageSection from 'shared/components/page-section';

export default function ManagerEnrollments({ manager }) {
    return (
        <PageSection
            className="manager-enrollments"
            title="Обучение"
            compact
        >
            {manager.enrollments?.length > 0 &&
                <List>
                    {manager.enrollments.map(enrollment =>
                        <List.Item
                            key={enrollment.id}
                            component={Link}
                            to={`${manager.url}${enrollment.url}`}
                            media={enrollment.statusIcon}
                            header={enrollment.title}
                            content={enrollment.statusLabel}
                            endMedia={enrollment.teacher &&
                                <Avatar
                                    name={enrollment.teacher.initials}
                                    title={enrollment.teacher.fullname}
                                />
                            }
                        />
                    )}
                </List>
            }
        </PageSection>
    );
}