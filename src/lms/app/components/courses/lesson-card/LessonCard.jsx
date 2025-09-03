import { Card, Heading, Image, Text } from 'shared/ui-components';

export default function LessonCard({ lesson, exercises, onSelect, ...props }) {
    const completedExercises = exercises.filter(exercise => exercise.completed);
    const checkedExercises = exercises.filter(exercise => exercise.checked);

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

                <Text as="p" type="body-md">{exercises.length} упражнений</Text>
                <Text as="p" type="body-md">{completedExercises.length} упражнений выполнено</Text>
                <Text as="p" type="body-md">{checkedExercises.length} упражнений проверено</Text>
            </Card.Content>
        </Card>
    );
}