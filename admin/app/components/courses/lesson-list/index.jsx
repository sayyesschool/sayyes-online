import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    List
} from '@fluentui/react-northstar';

import Icon from 'shared/components/material-icon';

import './index.scss';

export default function LessonList({ lessons, onDelete }) {
    const handleClick = useCallback((event, lesson) => {
        event.preventDefault();
        event.stopPropagation();

        onDelete(lesson);
    }, []);

    return (
        <List className="lesson-list" navigable>
            {lessons.map((lesson, index) =>
                <List.Item
                    key={lesson.id}
                    as={Link}
                    to={lesson.uri}
                    media={index + 1}
                    header={lesson.title}
                    content={`${lesson.exercises?.length} упражнений`}
                    endMedia={
                        <Button
                            icon={<Icon>delete</Icon>}
                            iconOnly
                            text
                            onClick={event => handleClick(event, lesson)}
                        />
                    }
                />
            )}
        </List>
    );
}