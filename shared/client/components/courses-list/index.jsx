import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import Button from 'shared/ui-components/button';
import Image from 'shared/ui-components/image';
import List from 'shared/ui-components/list';

export default function CoursesList({ courses, onRemove }) {
    const handleRemove = useCallback((event, courseId) => {
        event.preventDefault();
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
                            text
                            onClick={event => handleRemove(event, course.id)}
                        />
                    }
                />
            )}
        </List>
    );
}