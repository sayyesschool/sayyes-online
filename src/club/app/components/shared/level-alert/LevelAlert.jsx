import { useState } from 'react';

import { Alert, Button, Dialog, Flex, List, Text } from 'shared/components/ui';
import cn from 'shared/utils/classnames';

import { levels } from './data';

export default function LevelAlert({ onClose, ...props }) {
    const [isLevelDialogOpen, setLevelDialogOpen] = useState(false);

    return (
        <>
            <Alert
                color="warning"
                variant="soft"
                end={
                    <Button
                        content="Подробнее"
                        color="warning"
                        variant="soft"
                        onClick={() => setLevelDialogOpen(true)}
                    />
                }
            >
                <Text>
                    <strong>Внимание!</strong> Выбирайте встречу строго своего уровня!
                </Text>
            </Alert>

            <Dialog
                title="Уровни встреч"
                open={isLevelDialogOpen}
                onClose={onClose}
                {...props}
            >
                <Flex dir="column" gap="small">
                    <Text>Для всех студентов, обучающихся по курсу <i>Touchstone</i> или <i>Viewpoint</i> приводим соответствие:</Text>

                    <List>
                        {levels.map(({ id, title, level }) =>
                            <List.Item
                                key={id}
                                className={cn('LevelItem', `LevelItem--${level}`)}
                                content={
                                    <Text content={title} />
                                }
                                end={
                                    <Text content={level} />
                                }
                            />
                        )}
                    </List>

                    <Text>Если вы не знаете, какой у вас уровень по представленной шкале, уточните у вашего преподавателя.</Text>
                </Flex>
            </Dialog>
        </>
    );
}