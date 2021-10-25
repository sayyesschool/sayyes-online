import { Link } from 'react-router-dom';
import {
    Avatar,
    List
} from 'mdc-react';

export default function EnrollmentList({ enrollments }) {
    return (
        <List>
            {enrollments.map(enrollment =>
                <List.Item
                    component={Link}
                    to={enrollment.url}
                    leadingAvatar={<Avatar text={enrollment.client.initials} />}
                    primaryText={enrollment.client.fullname}
                    secondaryText={enrollment.domainLabel}
                />
            )}
        </List>
    );
}