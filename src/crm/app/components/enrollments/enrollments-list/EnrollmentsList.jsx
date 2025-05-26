import { Link } from 'react-router-dom';

import StatusIcon from 'shared/components/status-icon';
import { DomainLabel } from 'shared/data/common';
import { StatusLabel } from 'shared/data/enrollment';
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
                        <StatusIcon status={enrollment.status} />
                    }
                    content={<>
                        <Text type="body-md" content={DomainLabel[enrollment.domain]} />
                        <Text type="body-sm" content={StatusLabel[enrollment.status]} />
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