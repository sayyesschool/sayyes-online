import { Link } from 'react-router-dom';

import StatusIcon from 'shared/components/status-icon';
import { List, Text } from 'shared/ui-components';

export default function LessonsList({ lessons, statusIcon = true }) {
    return (
        <List className="sy-LessonsList">
            {lessons?.map(lesson =>
                <List.Item
                    key={lesson.id}
                    as={Link}
                    to={lesson.url}
                    decorator={statusIcon &&
                        <StatusIcon
                            status={lesson.status}
                        />
                    }
                    content={<>
                        <Text type="body2">{lesson.teacher?.fullname}</Text>
                        <Text type="body3">{lesson.dateTimeString}</Text>
                        <Text type="body3">{lesson.room?.name}</Text>
                    </>}
                />
            )}
        </List>
    );
}