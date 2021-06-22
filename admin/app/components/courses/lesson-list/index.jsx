import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    IconButton,
    List
} from 'mdc-react';

export default function LessonList({ lessons, onDelete }) {
    const handleClick = useCallback((event, lesson) => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(lesson);
    }, []);

    return (
        <List className="lesson-list" twoLine avatarList>
            {lessons.map((lesson, index) =>
                <List.Item
                    key={lesson.id}
                    component={Link}
                    to={lesson.uri}
                    graphic={<Avatar text={index + 1} />}
                    primaryText={lesson.title}
                    secondaryText={`${lesson.exercises?.length} упражнений`}
                    meta={
                        <IconButton
                            icon="delete"
                            onClick={event => handleClick(event, lesson)}
                        />
                    }
                />
            )}
        </List>
    );
}