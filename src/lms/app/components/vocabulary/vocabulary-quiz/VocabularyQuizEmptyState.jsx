import { Button, Text } from 'shared/ui-components';

import styles from './VocabularyQuizEmptyState.module.scss';

export default function VocabularyQuizEmptyState({ onAction }) {
    return (
        <div className={styles.root}>
            <Text type="h4">Для запуска тренажёра, необходимо иметь неизученные слова</Text>

            <Button
                content="Вернуться в словарь"
                onClick={onAction}
            />
        </div>
    );
}