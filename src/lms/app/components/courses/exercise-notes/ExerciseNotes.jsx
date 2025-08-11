import Content from 'shared/components/content';
import { useBoolean } from 'shared/hooks/state';
import { Button, Card, Flex } from 'shared/ui-components';

export default function ExerciseContent({
    exercise
}) {
    const [isOpen, toggleOpen] = useBoolean(false);

    return (
        <Card
            className="ExerciseNotes"
            color="neutral"
            variant="soft"
        >
            <Flex alignItems="center" justifyContent="space-between">
                <span className="overline">Заметки преподавателя</span>

                <Button
                    content={isOpen ? 'Скрыть' : 'Показать'}
                    color="neutral"
                    variant="soft"
                    size="sm"
                    onClick={toggleOpen}
                />
            </Flex>

            {isOpen &&
                <Content content={exercise.notes} html />
            }
        </Card>
    );
}