import { Link } from 'react-router-dom';
import {
    Avatar,
    List
} from '@fluentui/react-northstar';

import MaterialIcon from 'shared/components/material-icon';

export default function EnrollmentsList({ enrollments }) {
    return (
        <List className="enrollments-list">
            {enrollments.map(enrollment =>
                <List.Item
                    key={enrollment.id}
                    as={Link}
                    to={enrollment.url}
                    media={<MaterialIcon icon={enrollment.statusIcon} />}
                    header={enrollment.domainLabel}
                    content={enrollment.statusLabel}
                    endMedia={enrollment.teacher &&
                        <Avatar
                            text={enrollment.teacher.initials}
                            title={enrollment.teacher.fullname}
                        />
                    }
                />
            )}
        </List>
    );
}