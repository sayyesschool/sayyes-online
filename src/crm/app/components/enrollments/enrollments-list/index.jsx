import { Link } from 'react-router-dom';

import { DomainLabel } from 'shared/data/common';
import { StatusLabel } from 'shared/data/enrollment';
import StatusIcon from 'shared/components/status-icon';
import { Avatar, List, Text } from 'shared/ui-components';

export default function EnrollmentsList({ enrollments }) {
    return (
        <List className="EnrollmentsList">
            {enrollments.map(enrollment =>
                <List.Item
                    key={enrollment.id}
                    as={Link}
                    to={enrollment.url}
                    decorator={
                        <StatusIcon status="info" />
                    }
                    content={<>
                        <Text type="body-md">{DomainLabel[enrollment.domain]}</Text>
                        <Text type="body-sm">{StatusLabel[enrollment.status]}</Text>
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