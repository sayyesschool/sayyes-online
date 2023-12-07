import { Dialog, List, Text } from 'shared/components/ui';
import cn from 'shared/utils/classnames';

import { levels } from './data';

export default function LevelDialog({ onClose, ...props }) {
    return (
        <Dialog
            title="Уровни встреч"
            onClose={onClose}
            {...props}
        >
            <Text>Для всех студентов, обучающихся по курсу <i>Touchstone</i> или <i>Viewpoint</i> приводим соответствие:</Text>

            {levels.map(({ id, title, level }) =>
                <List.Item
                    key={id}
                    className={cn('LevelItem', `LevelItem--${level}`)}
                    icon="star"
                    content={{
                        primary: level,
                        secondary: title
                    }}
                />
            )}

            <Text>Если вы не знаете, какой у вас уровень по представленной шкале, уточните у вашего преподавателя.</Text>
        </Dialog>
    );
}