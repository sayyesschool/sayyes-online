import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    Icon,
    List
} from 'mdc-react';

export default function LessonList({ lessons }) {
    return (
        <List className="request-list" twoLine>
            {lessons.map(lesson =>
                <List.Item
                    key={lesson.id}
                    component={Link}
                    to={lesson.url}
                    graphic={<Icon>{lesson.lessonStatus}</Icon>}
                    primaryText={lesson.trial ? 'Пробный урок' : 'Урок'}
                    secondaryText={`${lesson.statusLabel} • ${lesson.datetime}`}
                    meta={lesson.teacher && <Avatar text={lesson.teacher.initials} title={lesson.teacher.fullname} />}
                />
            )}
        </List>
    );
}