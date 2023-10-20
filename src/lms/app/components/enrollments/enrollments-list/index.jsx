import { Link } from 'react-router-dom';

import { Avatar, List, Text } from 'shared/ui-components';

export default function EnrollmentsList({ enrollments }) {
    return (
        <List className="EnrollmentsList">
            {enrollments?.map(enrollment =>
                <List.Item
                    key={enrollment.id}
                    as={Link}
                    to={enrollment.url}
                    decorator={
                        <Avatar
                            imageUrl={enrollment.learner.imageUrl}
                            name={enrollment.learner.initials}
                        />
                    }
                    content={<>
                        <Text type="body1">{enrollment.learner.fullname}</Text>
                        <Text type="body2">{enrollment.domainLabel}</Text>
                    </>}
                />
            )}
        </List>
    );
}