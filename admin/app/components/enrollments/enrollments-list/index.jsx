import { Link } from 'react-router-dom';
import {
    Avatar,
    Icon,
    List
} from 'mdc-react';

export default function EnrollmentsList({ enrollments }) {
    return (
        <List className="enrollments-list">
            {enrollments.map(enrollment =>
                <List.Item
                    key={enrollment.id}
                    component={Link}
                    to={`${enrollment.url}`}
                    graphic={<Icon>{enrollment.statusIcon}</Icon>}
                    primaryText={enrollment.domainLabel}
                    secondaryText={enrollment.statusLabel}
                    meta={enrollment.teacher &&
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