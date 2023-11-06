import { List, Text } from 'shared/ui-components';
import { getLessonDateTimeString } from 'shared/utils/format';

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
                    
                    {lesson.room &&
                        <Text type="body-md">{lesson.room.name}</Text>
                    }
                </>,
                onClick: () => onItemClick(lesson)
            }))}
            interactive
        />
    );
}