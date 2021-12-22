import { Link } from 'react-router-dom';
import {
    Avatar,
    List
} from 'mdc-react';

import './index.scss';

export default function LessonsList({ unit, lessons, onSelect }) {
    return (
        <List>
            {lessons.map((lesson, index) =>
                <List.Item
                    key={lesson.id}
                    component={!onSelect ? Link : undefined}
                    to={!onSelect ? unit.url + `/lessons/${lesson.slug}` : undefined}
                    leadingAvatar={<Avatar text={index + 1} />}
                    primaryText={lesson.title}
                    secondaryText={`${lesson.exercises.length} упражнений`}
                    onClick={onSelect && (() => onSelect(unit, lesson))}
                />
            )}
        </List>
    );
}