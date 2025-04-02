import {
    Avatar,
    Checkbox,
    Flex,
    IconButton,
    Input,
    Text
} from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './LexemeExample.module.scss';

export default function LexemeExample({
    example,
    number,
    checked: isChecked,
    shouldShowNotification,
    readOnly,
    onCheck,
    onChange,
    onDelete
}) {
    const { id, text, translation, deleted } = example;

    return (
        <div key={id} className={cn(styles.root, deleted && styles.deleted)}>
            <Avatar content={number} size="sm" />

            <Flex dir="column" flex="1">
                <Input
                    className={styles.input}
                    placeholder="Пример"
                    name="text"
                    value={text}
                    variant="plain"
                    readOnly={readOnly}
                    required
                    onChange={e => onChange(id, e)}
                />

                <Input
                    className={styles.input}
                    placeholder="Перевод"
                    name="translation"
                    value={translation}
                    variant="plain"
                    size="sm"
                    readOnly={readOnly}
                    required
                    onChange={e => onChange(id, e)}
                />

                {shouldShowNotification &&
                    (readOnly ? (
                        <Checkbox
                            label={deleted
                                ? 'Сохранить пользователю удалённый пример?'
                                : 'Сохранить пользователю оригинальный пример?'
                            }
                            checked={isChecked}
                            size="sm"
                            onChange={() => onCheck(id)}
                        />
                    ) : (
                        <Text
                            content={deleted
                                ? 'Пример был удалён'
                                : 'Пример отличается от добавленного пользователем'
                            }
                            type="body-sm"
                            color={deleted ? 'danger' : 'warning'}
                        />
                    ))
                }
            </Flex>

            {!readOnly &&
                <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    icon={deleted ? 'undo' : 'delete'}
                    title={deleted ? 'Восстановить пример' : 'Удалить пример'}
                    onClick={() => onDelete(id)}
                />
            }
        </div>
    );
}