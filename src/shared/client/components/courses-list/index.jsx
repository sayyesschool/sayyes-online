import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Image, List } from 'shared/ui-components';

export default function CoursesList({ courses, onRemove }) {
    const handleRemove = useCallback((event, courseId) => {
        event.preventDefault();
        event.stopPropagation();

        onRemove(courseId);
    }, []);

    return (
        <List className="CoursesList">
            {courses.map(course =>
                <List.Item
                    key={course.id}
                    as={Link}
                    to={course.uri}
                    decorator={course.imageUrl &&
                        <Image imageUrl={course.imageUrl} alt="" />
                    }
                    content={course.title}
                    endAction={onRemove &&
                        <IconButton
                            icon="remove"
                            title="Убрать курс"
                            onClick={event => handleRemove(event, course.id)}
                            color="danger"
                            size="sm"
                        />
                    }
                />
            )}
        </List>
    );
}