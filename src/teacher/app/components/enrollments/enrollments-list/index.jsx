import { Link } from 'react-router-dom';

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
                        <Avatar
                            imageUrl={enrollment.client.imageUrl}
                            name={enrollment.client.initials}
                        />
                    }
                    content={<>
                        <Text type="body1">{enrollment.client.fullname}</Text>
                        <Text type="body2">{enrollment.domainLabel}</Text>
                    </>}
                />
            )}
        </List>
    );
}