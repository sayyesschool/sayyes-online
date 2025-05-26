import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, List } from 'shared/ui-components';

export default function CoursesList({ courses, onRemove }) {
    const handleRemove = useCallback((event, courseId) => {
        event.preventDefault();
        event.stopPropagation();

        onRemove(courseId);
    }, [onRemove]);

    return (
        <List className="CoursesList">
            {courses.map(course =>
                <List.Item
                    key={course.id}
                    as={Link}
                    to={course.url}
                    content={course.title}
                    endAction={onRemove &&
                        <IconButton
                            icon="remove"
                            title="Убрать курс"
                            color="danger"
                            size="sm"
                            onClick={event => handleRemove(event, course.id)}
                        />
                    }
                />
            )}
        </List>
    );
}