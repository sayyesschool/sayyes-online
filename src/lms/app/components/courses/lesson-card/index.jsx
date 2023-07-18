import { Card, Heading, Image, Text } from 'shared/ui-components';

import './index.scss';

export default function LessonCard({ lesson, onSelect, ...props }) {
    return (
        <Card
            className="LessonCard"
            orientation="horizontal"
            onClick={onSelect && (() => onSelect(lesson))}
            {...props}
        >
            <Card.Overflow>
                <Image src={lesson.imageUrl} alt="" ratio="16/9" sx={{ width: '256px' }} />
            </Card.Overflow>

            <Card.Content sx={{ px: 2 }}>
                <Heading as="h2" type="h5">{lesson.title}</Heading>

                {/* {lesson.description &&
                <Text as="p" dangerouslySetInnerHTML={{ __html: lesson.description }} />
            } */}

                <Text as="p">{lesson.exercises?.length} упражнений</Text>
            </Card.Content>
        </Card>
    );
}