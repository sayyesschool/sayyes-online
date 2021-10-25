import { Link } from 'react-router-dom';
import {
    Avatar,
    Icon,
    List
} from 'mdc-react';

export default function CourseList({ courses }) {
    return (
        <List className="course-list">
            {courses.map(course =>
                <List.Item
                    key={course.id}
                    component={Link}
                    to={course.url}
                    start={<Icon>{course.courseStatus}</Icon>}
                    primaryText={course.trial ? 'Пробный урок' : 'Урок'}
                    secondaryText={`${course.statusLabel} • ${course.datetime}`}
                    end={course.teacher &&
                        <Avatar text={course.teacher.initials} title={lesson.teacher.fullname} />
                    }
                />
            )}
        </List>
    );
}