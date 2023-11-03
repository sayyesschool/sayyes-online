import moment from 'moment';

import { List, Text } from 'shared/ui-components';

export default function LessonsList({ lessons, onItemClick }) {
    return (
        <List
            className="LessonsList"
            items={lessons?.map(lesson => ({
                key: lesson.id,
                content: <>
                    <Text
                        type="title-md"
                        content={getLessonDateTimeString(lesson)}
                    />
                    <Text type="body-md">{lesson.room?.name}</Text>
                </>,
                onClick: () => onItemClick(lesson)
            }))}
            interactive
        />
    );
}

function getLessonDateTimeString(lesson) {
    const dateString = moment(lesson.date).format('dddd, DD.MM');
    const startTime = moment(lesson.startAt).format('HH:mm');
    const endTime = moment(lesson.endAt).format('HH:mm');

    return `${dateString}, ${startTime}-${endTime}`;
}