import { Card, Heading, Image, Text } from 'shared/ui-components';

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
                <Heading
                    as="h2"
                    type="title-lg"
                    content={lesson.title}
                />

                <Text as="p" type="body-sm">
                    {lesson.sections?.length} секций
                </Text>

                {lesson.description &&
                    <Text
                        as="article"
                        type="body-md"
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: lesson.description }}
                        />
                    </Text>
                }
            </Card.Content>
        </Card>
    );
}