import { Link } from 'react-router-dom';

import Avatar from 'shared/ui-components/avatar';
import List from 'shared/ui-components/list';

import './index.scss';

export default function LessonsList({ unit, lessons, onSelect }) {
    return (
        <List>
            {lessons.map((lesson, index) =>
                <List.Item
                    key={lesson.id}
                    as={!onSelect ? Link : undefined}
                    to={!onSelect ? unit.url + `/lessons/${lesson.slug}` : undefined}
                    media={<Avatar text={index + 1} />}
                    header={lesson.title}
                    content={`${lesson.exercises.length} упражнений`}
                    onClick={onSelect && (() => onSelect(unit, lesson))}
                />
            )}
        </List>
    );
}