import { Link } from 'react-router-dom';
import { Avatar, List } from '@fluentui/react-northstar';

export default function EnrollmentsList({ enrollments }) {
    return (
        <List>
            {enrollments.map(enrollment =>
                <List.Item
                    key={enrollment.id}
                    as={Link}
                    to={enrollment.url}
                    media={
                        <Avatar
                            name={enrollment.client.fullname}
                        />
                    }
                    header={enrollment.client.fullname}
                    content={enrollment.domainLabel}
                    selectable
                />
            )}
        </List>
    );
}