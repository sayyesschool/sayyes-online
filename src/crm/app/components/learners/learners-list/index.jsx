import { Link } from 'react-router-dom';

import { List, Text } from 'shared/ui-components';

export default function LearnersList({ learners }) {
    return (
        <List className="LearnersList">
            {learners.map(learner =>
                <List.Item
                    key={learner.id}
                    as={Link}
                    to={learner.url}
                    content={<>
                        <Text type="body2">{learner.fullname}</Text>
                        <Text type="body3">{learner.email} {learner.phone}</Text>
                    </>}
                />
            )}
        </List>
    );
}