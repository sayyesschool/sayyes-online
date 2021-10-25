import {
    Button,
    Card,
    Icon,
    IconButton
} from 'mdc-react';
import classnames from 'classnames';

import { useBoolean } from 'shared/hooks/state';
import ExerciseContent from 'shared/components/exercise-content';

import './index.scss';

const ExerciseTypeLabel = {
    boolean: 'Да / Нет',
    choice: 'Выбор',
    essay: 'Эссе',
    fib: 'Заполнить пробелы',
    input: 'Ввод',
    text: 'Текст'
};

export default function ExerciseCard({ exercise }) {
    const [isChecked, toggleChecked] = useBoolean(false);
    const [isCollapsed, toggleCollapsed] = useBoolean(true);

    const classNames = classnames('exercise-card', `exercise-card--${exercise.type}`);

    return (
        <Card className={classNames}>
            <Card.PrimaryAction onClick={toggleCollapsed}>
                <Card.Header
                    title={exercise.title}
                    subtitle={ExerciseTypeLabel[exercise.type]}
                    graphic={
                        <IconButton icon="radio_button_unchecked" />
                    }
                    actions={[
                        <IconButton
                            key="toggle"
                            icon={isCollapsed ? 'expand_more' : 'expand_less'}
                        />
                    ]}
                />
            </Card.PrimaryAction>

            {!isCollapsed &&
                <>
                    <Card.Section primary>
                        <ExerciseContent
                            exercise={exercise}
                            checked={isChecked}
                        />
                    </Card.Section>

                    <Card.Actions>
                        <Card.Action button>
                            <Button
                                label="Проверить"
                                icon={<Icon>done_all</Icon>}
                                outlined
                                onClick={() => toggleChecked(true)}
                            />
                        </Card.Action>

                        <Card.Action button>
                            <Button
                                label="Сохранить"
                                icon={<Icon>save</Icon>}
                                outlined
                            />
                        </Card.Action>
                    </Card.Actions>
                </>
            }
        </Card>
    );
}