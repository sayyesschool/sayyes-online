import { Link } from 'react-router-dom';
import {
    Avatar,
    List
} from 'mdc-react';

export default function LessonList({ lessons }) {
    return (
        <List className="request-list">
            {lessons.map(lesson =>
                <List.Item
                    key={lesson.id}
                    component={Link}
                    to={lesson.url}
                    leadingIcon={lesson.lessonStatus}
                    primaryText={lesson.dateLabel}
                    secondaryText={lesson.timeLabel}
                    end={lesson.teacher &&
                        <Avatar text={lesson.teacher.initials} title={lesson.teacher.fullname} />
                    }
                />
            )}
        </List>
    );
}