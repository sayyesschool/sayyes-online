import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    IconButton,
    List
} from 'mdc-react';

export default function CoursesList({ courses, onRemove }) {
    const handleRemove = useCallback((event, courseId) => {
        event.stopPropagation();

        onRemove(courseId);
    }, []);

    return (
        <List imageList>
            {courses.map(course =>
                <List.Item
                    key={course.id}
                    component={Link}
                    to={course.uri}
                    graphic={<img src={course.imageUrl} />}
                    text={course.title}
                    meta={
                        <IconButton
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