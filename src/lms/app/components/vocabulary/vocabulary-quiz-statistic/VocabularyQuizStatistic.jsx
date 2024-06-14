import { Button } from 'shared/ui-components';

import styles from './VocabularyQuizStatistic.module.scss';

export default function VocabularyQuizStatistic({ statistic, onContinue, onBack }) {
    return (
        <div className={styles.root}>
            <ul className={styles.list}>
                {statistic.map(({ id, value, oldStatus, newStatus }) => (
                    <li
                        key={id}
                        className={styles.listItem}
                    >
                        <span>{value}:</span>
                        <span>{getStatusDifference(oldStatus, newStatus)}</span>
                    </li>
                ))}
            </ul>

            <Button
                content="Продолжить"
                onClick={onContinue}
            />

            <Button
                content="Вернуться в словарь"
                onClick={onBack}
            />
        </div>
    );
}

function getStatusDifference(oldStatus, newStatus) {
    const difference = newStatus - oldStatus;
    const sign = difference > 0 ? '+' : '';

    return `${sign}${difference}`;
}