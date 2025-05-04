import {
    Avatar,
    Flex,
    IconButton,
    Input
} from 'shared/ui-components';
import cn from 'shared/utils/classnames';

import styles from './LexemeFormExample.module.scss';

export default function LexemeFormExample({
    example,
    number,
    disabled,
    readOnly,
    onChange,
    onDelete,

    children
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
                    disabled={disabled}
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
                    disabled={disabled}
                    readOnly={readOnly}
                    required
                    onChange={e => onChange(id, e)}
                />

                {children}
            </Flex>

            {!readOnly &&
                <IconButton
                    size="sm"
                    variant="plain"
                    color="neutral"
                    icon={deleted ? 'undo' : 'delete'}
                    title={deleted ? 'Восстановить пример' : 'Удалить пример'}
                    disabled={disabled}
                    onClick={() => onDelete(id)}
                />
            }
        </div>
    );
}