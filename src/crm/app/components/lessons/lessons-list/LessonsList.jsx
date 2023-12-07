import { Link } from 'react-router-dom';

import StatusIcon from 'shared/components/status-icon';
import { List, Text } from 'shared/ui-components';

export default function LessonsList({ lessons, statusIcon = true }) {
    return (
        <List className="LessonsList">
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
                        <Text type="body-md">{lesson.teacher?.fullname}</Text>
                        <Text type="body-sm">{lesson.timeString} · {lesson.room?.name}</Text>
                    </>}
                />
            )}
        </List>
    );
}