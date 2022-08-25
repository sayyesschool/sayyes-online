import { Link } from 'react-router-dom';
import { Card, Image, Text } from '@fluentui/react-northstar';

import './index.scss';

export default function LessonCard({ lesson, onSelect }) {
    return (
        <Card
            className="lesson-card"
            as={!onSelect ? Link : undefined}
            to={!onSelect ? lesson.uri : undefined}
            horizontal
            compact
            onClick={onSelect && (() => onSelect(lesson))}
        >
            <Card.Preview horizontal>
                <Image src={lesson.imageUrl} alt="" />
            </Card.Preview>

            <Card.Body>
                <Text as="h2">{lesson.title}</Text>

                {lesson.description &&
                    <Text as="p" dangerouslySetInnerHTML={{ __html: lesson.description }} />
                }

                <Text as="p">{lesson.exercises?.length} упражнений</Text>
            </Card.Body>
        </Card>
    );
}