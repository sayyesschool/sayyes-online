import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, List } from '@fluentui/react-northstar';

export default function CoursesList({ courses, onRemove }) {
    const handleRemove = useCallback((event, courseId) => {
        event.stopPropagation();

        onRemove(courseId);
    }, []);

    return (
        <List>
            {courses.map(course =>
                <List.Item
                    key={course.id}
                    as={Link}
                    to={course.uri}
                    media={course.imageUrl &&
                        <Image src={course.imageUrl} alt="" />
                    }
                    header={course.title}
                    endMedia={onRemove &&
                        <Button
                            icon="remove"
                            title="Убрать курс"
                            onClick={event => handleRemove(event, course.id)}
                        />
                    }
                />
            )}
        </List>
    );
}