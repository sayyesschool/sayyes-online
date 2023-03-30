import { Link } from 'react-router-dom';

import StatusIcon from 'shared/components/status-icon';
import { Avatar, List, Text } from 'shared/ui-components';

export default function EnrollmentsList({ enrollments }) {
    return (
        <List className="sy-EnrollmentsList">
            {enrollments.map(enrollment =>
                <List.Item
                    key={enrollment.id}
                    as={Link}
                    to={enrollment.url}
                    decorator={
                        <StatusIcon status="info" />
                    }
                    content={<>
                        <Text type="body1">{enrollment.domainLabel}</Text>
                        <Text type="body2">{enrollment.statusLabel}</Text>
                    </>}
                    end={enrollment.teacher &&
                        <Avatar
                            text={enrollment.teacher.fullname}
                            title={enrollment.teacher.fullname}
                        />
                    }
                />
            )}
        </List>
    );
}